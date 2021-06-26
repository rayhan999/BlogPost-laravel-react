import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Example';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log("privateRoute",loggedInUser);
    return (
        <Route
            {...rest}
            render={({ location }) =>
            Cookies.get('uname') !== undefined ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;