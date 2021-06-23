
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

export const UserContext = createContext();
function Example() {
    
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    useEffect(()=>{
        const uname = Cookies.get('uname');
        if(uname) {setLoggedInUser(uname);}
    },[Cookies.get('uname')]);
    return (
        <div className="container">
            <UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="container">
                {/* <h3>email: {loggedInUser.email}</h3> */}
                <Router>

                    <Switch>
                        <Route exact path="/">
                            <Navbar></Navbar>
                        </Route>
                        {/* <PrivateRoute path="/dashboard/:panel">
              <Dashboard adminLoading={adminLoading} />
            </PrivateRoute> */}
                        <Route path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute path="/posts">
                            <Posts></Posts>
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

