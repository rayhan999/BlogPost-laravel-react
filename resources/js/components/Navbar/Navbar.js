import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
    window.addEventListener('scroll', changeNavBG);
    return (
        <nav className= "navbar navbar-expand-lg bg-primary fixed-top"  >
            <h1 class="navbar-brand " style={{ fontWeight: 'bold' }} >TechNext</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon float-end"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                       <NavLink className="nav-link mr-5 " to="/posts">Posts </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link mr-5" to="/about">About Us</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink className="nav-link mr-5  " to="/review">Reviews</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link mr-5  " to="/admin">Admin</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link mr-5  " to="/contact">Contact Us</NavLink>
                    </li>
                    {/* {loggedInUser.isSignedIn ?
                        <li class="nav-item login" style={{ fontWeight: 'bold' }} >
                            <span class="nav-link  userName" style={{ cursor: 'default', fontWeight: 'bold', color: 'white' }} onClick={() => setLoggedInUser({})}>{loggedInUser.name}</span>
                        </li>
                        : */}

                        <li class="nav-item ">
                            <Link class="nav-link  " style={{ color: 'white' }} to="/login">Login</Link>
                        </li>
                    {/* } */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;