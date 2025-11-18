import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            try {
                if (currentUser?.email) {
                    localStorage.setItem('userEmail', currentUser.email);
                } else {
                    localStorage.removeItem('userEmail');
                }
            } catch {err}
        });

        return () => unsubscribe();
    }, []);


    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('userEmail');
            } catch {err}
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const authInfo = {
        user,
        loading,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
