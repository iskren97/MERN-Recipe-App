import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export const Auth = () => {
  return (
    <>
      <h1 className="auth-heading">Auth</h1>
      <div className="auth-container">
        <Login />
        <Register />
      </div>
    </>
  );
};
