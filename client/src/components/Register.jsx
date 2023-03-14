import React, { useState } from 'react';
import Form from './Form';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3002/users/register', {
        username,
        password,
      });

      alert('Registration completed!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        label={'Register'}
        username={username}
        setUsername={handleUsernameChange}
        password={password}
        setPassword={handlePasswordChange}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Register;
