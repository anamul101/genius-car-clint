import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const LognIn = () => {
    const {authLognIn,setLoader} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handelSubmit = (event)=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name,email,password);
        authLognIn(email, password)
        .then(result=>{
            const user = result.user;
            const currentUser={
                email: user.email
            }
            
            fetch('http://localhost:5000/jwt',{
                method:'POST',
                headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                localStorage.setItem('geniousToken', data.token);
                navigate(from, {replace:true})
            })
            form.reset();
            
        })
        .catch(error=>console.error(error))
        .finally(()=>{
            setLoader(false)
        })
    }
    return (
        <div className="hero my-20 w-full">
            <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center w-2/3 lg:text-left">
                        <img src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 pb-20 border border-orange-600">
                    <h1 className="text-5xl font-bold text-center pt-5">Login</h1>
                    <form onSubmit={handelSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-center'>New Genious Car <Link className='font-bold text-orange-600 hover:underline' to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LognIn;