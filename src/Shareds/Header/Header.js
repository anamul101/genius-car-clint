import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const Header = () => {
    const {user,LogOut} = useContext(AuthContext);
    const handelLogOut = ()=>{
        LogOut()
        .then(()=>{})
        .catch(error=>console.error(error))
    }
    const manuItems = <>
        <li className='font-semibold mr-2'><Link to='/'>Home</Link></li>
        {
            user?.email && <li className='font-semibold mr-2'><Link to='/orders'>Orders</Link></li>
        }
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {manuItems}
                </ul>
                </div>
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {manuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user?.uid && <p>{user?.displayName}</p>}
            <>
            {
              user?.uid?
              <> 
                
                <div>  
                    
                    <img src={user?.photoURL} style={{height:'40px'}} className="rounded-full mr-4" alt="" /> 
                </div>
                <button onClick={handelLogOut} className='btn btn-outline btn-error mr-2'>
                  Logout
                </button>
              </>
              :
              <>
               <button className='btn btn-outline btn-primary mr-2'>
                  <Link to='/lognin'>Login</Link>
                </button>
                <button className='btn btn-outline btn-secondary mr-2'>
                  <Link to='/signup'>Sign Up</Link>
                </button>
              </>
            }
          </>
                <button className="btn btn-outline btn-warning">Get Started</button>
            </div>
        </div>
    );
};

export default Header;