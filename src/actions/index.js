import db, { auth, provider, storage } from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "../actions/actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
})

export const getArticles = (payloade) => ({
  type : GET_ARTICLES,
  article: payloade
})

export function SignInAPI() {
  return (dipatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        dipatch(setUser(payload.user));
      })
      .catch((err) => alert(err.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutApi() {
  return (dipatch) => {
    auth.signOut().then(() => {
      dipatch(setUser(null));
    });
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true))
    if (payload.image !== "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles")
            .add({
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downloadURL,
              comments: 0,
              description: payload.description,
            })
            dispatch(setLoading(false))
        }
      );
    } else if (payload.video) {
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false))
    }
  };
}

export function getArticleAPI() {
return (dispatch) => {
  dispatch(setLoading(true))
  db.collection('articles').orderBy('actor.date', 'desc').onSnapshot((snapshot) => {
   const payload = snapshot.docs.map((doc) => doc.data())
   console.log(payload)
   dispatch(getArticles(payload))
  })
  dispatch(setLoading(false))
}
}