import React from 'react';
import {Link} from 'react-router-dom';
import '../Style/Navbar.css';

function Navbar(){
    return (
        <div className='navbar'>
           <Link className='link' to='/'>Home</Link>
           <Link className='link' to='/login'>Login</Link>
           <Link className='link' to='/register'>Register</Link>
        </div>
    )
}

export default Navbar;