import React from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const SignUp = () => {
    const {createUser} = useContext(AuthContext);
    const handelSubmit = (event)=>{
        event.preventDefault();
        const form = event.target;
        const name= form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name,email,password);
        createUser(email, password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            form.reset();
        })
        .catch(error=>console.error(error))

    }
    return (
        <div className="hero my-20 w-full">
            <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center w-2/3 lg:text-left">
                        <img src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 pb-20 border border-orange-600">
                    <h1 className="text-5xl font-bold text-center pt-5">Sign Up</h1>
                    <form onSubmit={handelSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" placeholder="Name" name="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required/>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="SignUp" />
                        </div>
                    </form>
                    <p className='text-center'>Already have an account? <Link className='font-bold text-orange-600 hover:underline' to='/lognin'>SignIn</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;