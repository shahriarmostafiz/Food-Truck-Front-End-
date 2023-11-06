import { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import useAxios from '../hooks/useAxios';
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxios()
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
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email
            const loggedUser = { email: userEmail }
            setUser[currentUser]
            setLoading(false)
            if (currentUser) {
                axiosSecure.post("/jwt", loggedUser)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
            }
            else {
                axiosSecure.post("/logout", loggedUser)
                    .then(res => { console.log(res.data) })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        return () => {
            return unsubscribe()
        }
    }, [axiosSecure, user?.email])

    // logout
    const logout = () => {
        return signOut(auth)
    }
    // const auth = auth
    const AuthValue = { user, loading, signup, login, logout }

    return (
        <AuthContext.Provider value={AuthValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;