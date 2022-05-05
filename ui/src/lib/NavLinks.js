import { Link } from 'react-router-dom';

const NavLinks = () => {
  return (
    <ul className='navlinks'>
      <Link to='/about'>
        <li className='navlinks-link'>About</li>
      </Link>
    </ul>
  );
};

export default NavLinks;
