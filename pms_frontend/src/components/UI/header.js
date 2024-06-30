import React from 'react';
import {useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utility/constants';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      navigate('/login');
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    };
  
    return (
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Welcome to Personal Managment System</h1>
          <button type="button" className='logout-btn ' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
    );
  }

export default Header;
