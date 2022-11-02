import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../Firebase/Firebase.config';



 export const AuthContext = createContext();
 const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    // google sign in 
    const authSignInGoogle = (provider)=>{
        setLoader(true)
        return signInWithPopup(auth,provider);
    }
    // GitHub sign in 
    const authSignInGithub = (provider)=>{
        setLoader(true)
        return signInWithPopup(auth, provider);
    }
    // form with register
    const createUser = (email,password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    // lognIn with password
    const authLognIn =(email,password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // ubdate Profile
    const authUpdate = (profile)=>{
        setLoader(true);
        return updateProfile(auth.currentUser,profile);
    }
    // email verification
    const verifiEmail = ()=>{
        return sendEmailVerification(auth.currentUser);
    }
    // Reset password
    const forgetPassword=(email)=>{
        return sendPasswordResetEmail(auth, email);
    }
    // logOut
    const LogOut = ()=>{
        setLoader(true);
        return signOut(auth);
    } 

    useEffect(()=>{
        const unSubscibe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoader(false)
        })
        return ()=>{
            unSubscibe();
        }
    },[])
    const authInfo = {
        user,
        loader,
        authSignInGoogle,
        LogOut,
        createUser,
        authLognIn,
        authUpdate,
        verifiEmail,
        setLoader,
        authSignInGithub,
        setUser,
        forgetPassword
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;