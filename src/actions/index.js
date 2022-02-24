import { auth, provider } from '../firebase'
import { SET_USER } from '../actions/actionType'
export const setUser = (payload) => ({
    type: SET_USER,
    user: payload
})

export function SignInAPI() {
    return (dipatch) => {
        auth.signInWithPopup(provider).then((payload) => {
            dipatch(setUser(payload.user))
        }).catch((err) => alert(err.message))
    }
}