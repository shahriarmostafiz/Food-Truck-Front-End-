import { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// import useAxios from '../hooks/useAxios';
import axios from 'axios';
export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // creating user
    const signup = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    // login
    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    // const axiosSecure = useAxios()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email
            const loggedUser = { email: userEmail }
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                axios.post("https://food-truck-server.vercel.app/api/v1/jwt", loggedUser, { withCredentials: true })
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
            }
            else {
                axios.post("https://food-truck-server.vercel.app/api/v1/logout", loggedUser)
                    .then(res => { console.log(res.data) })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        return () => {
            return unsubscribe()
        }
    }, [user?.email])

    // logout
    const logout = () => {
        return signOut(auth)
    }
    const update = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    // const auth = auth
    const AuthValue = { user, loading, signup, login, logout, update, googleLogin }

    return (
        <AuthContext.Provider value={AuthValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;