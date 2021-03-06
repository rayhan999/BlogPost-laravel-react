
import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import Cookies from 'js-cookie'
import Navbar from "./Navbar/Navbar.js";
import Login from "./Login/Login.js"
import Posts from './Posts/Posts.js';
import PrivateRoute from './PrivateRoute/PrivateRoute.js';
import LoginRoute from './PrivateRoute/LoginRoute.js';
import Myposts from './Myposts/Myposts.js';
import AddPost from './Myposts/AddPost/AddPost.js';
import EditPost from './Myposts/EditPost/EditPost.js';
import PostDetails from './Posts/PostDetails/PostDetails.js';
import UserList from './UserList/UserList.js';
import UserProfile from './UserList/UserProfile/UserProfile.js';

export const UserContext = createContext();
function Example() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const uname = Cookies.get('uname');
        if (uname) { setLoggedInUser(uname); }
    }, [Cookies.get('uname')]);
    return (
        <div className="mb-5">
            <UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="container">
                {/* <h3>email: {loggedInUser.email}</h3> */}
                <Router>

                    <Switch>
                    <Route exact path="/">
                            <Posts></Posts>
                        </Route>
                        <Route exact path="/posts">
                            <Posts></Posts>
                        </Route>
                        <Route path="/posts/:id">
                            <PostDetails></PostDetails>
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute exact path="/myposts">
                            <Myposts></Myposts>
                        </PrivateRoute>
                        <PrivateRoute path="/myposts/add">
                            <AddPost></AddPost>
                        </PrivateRoute>
                        <PrivateRoute path="/myposts/edit/:id">
                            <EditPost></EditPost>
                        </PrivateRoute>
                        <PrivateRoute exact path="/users">
                            <UserList></UserList>
                        </PrivateRoute>
                        <PrivateRoute path="/users/:id">
                            <UserProfile></UserProfile>
                        </PrivateRoute>
                    </Switch>

                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}

