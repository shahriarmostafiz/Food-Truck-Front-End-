import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
export const AuthContext = createContext(null)

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
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser[currentUser]
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

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