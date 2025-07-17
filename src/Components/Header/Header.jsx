import React from 'react';
import style from './Header.module.css';
import {useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleAdd = () => {
    navigate('/create');
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <>
      <div className={style.header}>
        <div className={style.redCircle}></div>
        <div className={style.yellowCircle}></div>
        <div className={style.greenCircle}></div>
      </div>

      <div className={style.headerBody} >
        <h1 className={style.title}>Employee Management Software</h1>
       <div className="buttons-container d-flex align-items-center justify-content-between">
       <div className='left-buttons'>
        <button className={style.addBtn} onClick={handleAdd}>
          Add Employee
        </button>
        <button className={style.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
        </div>
          <div className='right-buttons'>
          <button onClick={ toggleDarkMode} className='btn btn-dark ms-2 p-2'>Dark Mode</button>
          </div>
       </div>
      </div>
    </>
  );
}

export default Header;
