import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const NavLinks = () => {
  const { user } = useContext(AuthContext);

  return (
    <ul className='navlinks'>
      {user ? (
        <>
          <Link to='/dashboard'>
            <li className='navlinks-item'>
              <a className='navlinks-link'>Dashboard</a>
            </li>
          </Link>
          <li className='navlinks-item'>
            <a className='navlinks-link'>Logout</a>
          </li>
        </>
      ) : (
        <>
          <Link to='/login'>
            <li className='navlinks-item'>
              <a className='navlinks-link'>Login</a>
            </li>
          </Link>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
