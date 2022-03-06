import React from 'react';
import {
    Link, useNavigate
} from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('admin');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img
            alt='logo'
            className='logo'
             src='https://www.juaaree.com/images/logo.png' />
            {
                auth ?

                    <ul className="nav-ul">
                        <li><Link to="/">Student</Link></li>
                        <li><Link to="/add">Add Students</Link></li>
                        <li><Link to="/update"> Update Students</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li> <Link onClick={logout} to="/signup">Logout ({ JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li> <Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }


        </div>
    )
}

export default Nav;