    // Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='h-16 flex-no-wrap fixed top-0 flex w-full items-center justify-between bg-transparent backdrop-blur-sm py-2 shadow-lg lg:flex-wrap lg:justify-start z-10 text-violet-600 lg:py-4'>
      <div className="container bg-transparent mx-auto flex justify-evenly items-center">
        <Link to="/" className=" text-xl bg-transparent tracking-wider font-semibold">Home</Link>
        <Link to="/editor" className=" text-xl bg-transparent tracking-wider font-semibold"> Editor</Link>
      </div>
    </nav>
  );
};

export default Navbar;
