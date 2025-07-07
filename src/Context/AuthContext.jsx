import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null)

export const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const signUpUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const signInUser = (email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth , email , password)
    }

    const updateUser = (name , photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser , {
            displayName: name ,
            photoURL:photo,
        })
    }

    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth , googleProvider)
    }

    const signOutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe =  onAuthStateChanged(auth , async(currentUser)=>{
            if(currentUser?.email){
                setUser(currentUser)
                const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`,{
                    email : currentUser?.email ,
                },{
                    withCredentials:true 
                })
                console.log(data)
            }else{
                setUser(currentUser)
                const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`,{},{
                    withCredentials:true 
                })
                console.log(data)
            }

            setLoading(false)
        })
        return ()=>{
            unSubscribe();
        }
    },[])


    const userInfo = {
        user,
        loading,
        signUpUser,
        signOutUser,
        signInUser,
        googleSignIn,
        updateUser,
    }
    return <AuthContext.Provider value={userInfo} >{children}</AuthContext.Provider>
}