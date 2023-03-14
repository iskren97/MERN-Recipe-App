import React, { useState } from 'react';
import Form from './Form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [_, setCookies] = useCookies(['access_token']);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/users/login', {
        username,
        password,
      });

      console.log(response);
      setCookies('access_token', response.data.token);
      window.localStorage.setItem('userID', response.data.user._id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        label={'Login'}
        username={username}
        setUsername={handleUsernameChange}
        password={password}
        setPassword={handlePasswordChange}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Login;
