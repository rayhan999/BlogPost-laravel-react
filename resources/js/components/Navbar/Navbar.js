import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../Example';
import './Navbar.css';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [navActice, setNavActive] = useState(false);
    const changeNavBG = () => {
        if (window.scrollY > 80) {
            setNavActive(true);
        } else { setNavActive(false); }
    }
    const handleLogout = () => {
        Cookies.remove('uname');
        setLoggedInUser(null);
    }
    window.addEventListener('scroll', changeNavBG);
    return (
        <nav className= "navbar navbar-expand-lg bg-primary "  >
            <h1 className="navbar-brand " style={{ fontWeight: 'bold', color: 'white' }} >Blog-Post</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon float-end"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                       <NavLink className="nav-link mr-5 " to="/posts">Posts </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link mr-5" to="/myposts">My Posts</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink className="nav-link mr-5  " to="/users">Users</NavLink>
                    </li>
                   
                    {loggedInUser ?
                        <li className="nav-item login" style={{ fontWeight: 'bold' }} >
                            <span className="nav-link  userName" style={{ cursor: 'default', fontWeight: 'bold', color: 'white' }} onClick={handleLogout}>{loggedInUser}</span>
                        </li>
                        :

                        <li className="nav-item ">
                            <Link className="nav-link  " style={{ color: 'white' }} to="/login">Login</Link>
                        </li>
                     } 
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;