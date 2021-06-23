import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

const LoginRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                Cookies.get('uname') === undefined ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default LoginRoute;