import React from 'react';
import logo from '../images/swlogo.png'
import './Header.scss';

function Header() {
  return (
    <header className="Header bg-dark-color">
      <div className="wrapper p-2 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="logo">
        <img src={logo} className="logo object-contain max-w-52" alt="Star Wars Character App logo" />
        </div>
        <div className="title grow mx-16">
          <h1 className="text-center">Star Wars Character App</h1>
        </div>

      </div>
    </header>
  );
}

export default Header;

