import React from 'react';

const Form = ({
  label,
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={setUsername}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={setPassword}
        />
        <button type="submit">{label}</button>
      </form>
    </>
  );
};

export default Form;
