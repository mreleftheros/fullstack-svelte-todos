import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const NavLinks = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <ul className='navlinks'>
      {user ? (
        <>
          <li className='navlinks-item'>
            <p>
              Welcome, <span className='navlinks-name'>{user.username}</span>
            </p>
          </li>
          <li className='navlinks-item'>
            <Link to='/dashboard' className='navlinks-link'>
              Dashboard
            </Link>
          </li>
          <li className='navlinks-item'>
            <a className='navlinks-link' onClick={logout}>
              Logout
            </a>
          </li>
        </>
      ) : (
        <>
          <li className='navlinks-item'>
            <Link to='/login' className='navlinks-link'>
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
