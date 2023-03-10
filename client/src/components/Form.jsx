import React from 'react';

const Form = ({ label, username, setUsername, password, setPassword }) => {
  return (
    <>
      <form>
        <h2>{label}</h2>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" onChange={setUsername} />

        <label htmlFor="password">Password</label>
        <input type="text" id="password" onChange={setPassword} />
      </form>

      <button type="submit">{label}</button>
    </>
  );
};

export default Form;
