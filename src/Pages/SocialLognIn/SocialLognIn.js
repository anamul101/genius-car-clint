import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle,FaGithub, FaFacebook } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const SocialLognIn = () => {
    const {authSignInGoogle} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handelGoogle = ()=>{
        authSignInGoogle(googleProvider)
            .then((result)=>{
                const user = result.user;
                const currentUser={
                    email: user.email
                }
                
                fetch('https://genius-car-server-three-tau.vercel.app/jwt',{
                    method:'POST',
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(currentUser)
                })
                .then(res=>res.json())
                .then(data=>{
                    localStorage.setItem('geniousToken', data.token);
                    navigate(from, {replace:true});
                    toast.success('LogIn successful')
                })
            })
            .catch(error=>{
                toast.error(error.message);
            })
    }
    return (
        <div className='flex'>
            <FaGoogle onClick={handelGoogle} className='mr-3 cursor-pointer'></FaGoogle>
            <FaGithub className='mr-3 cursor-pointer'></FaGithub>
            <FaFacebook className='cursor-pointer'></FaFacebook>
        </div>
    );
};

export default SocialLognIn;