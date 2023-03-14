import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const logout = () => {
    setCookies('access_token', '');
    localStorage.removeItem('userID');
    navigate('/auth');
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipes"></Link>

      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
