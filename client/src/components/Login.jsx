import React from 'react';

const Login = () => {
  return (
    <>
      <form>
        <h2>Login</h2>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" />

        <label htmlFor="password">Password</label>
        <input type="text" id="password" />
      </form>
    </>
  );
};

export default Login;
