import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('authToken') ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }}/>
        )
    )}/>
);