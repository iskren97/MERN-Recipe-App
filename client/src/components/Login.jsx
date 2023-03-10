import React, { useState } from 'react';
import Form from './Form';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <>
      <Form
        label={'Login'}
        username={username}
        setUsername={handleUsernameChange}
        password={password}
        setPassword={handlePasswordChange}
      />
    </>
  );
};

export default Login;
