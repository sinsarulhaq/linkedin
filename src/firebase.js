import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDINr800njGDkhGxplkjarXhT4UVp7Nu_w",
  authDomain: "linkedin-7eb14.firebaseapp.com",
  projectId: "linkedin-7eb14",
  storageBucket: "linkedin-7eb14.appspot.com",
  messagingSenderId: "799792590044",
  appId: "1:799792590044:web:d1eca39b446bc0d7405819",
  measurementId: "G-T6ZPRBHVV7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
