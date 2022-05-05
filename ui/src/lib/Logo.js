import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className='logo'>
      <Link to='/'>
        <h2 className='logo-title'>Mern Todos</h2>
      </Link>
    </div>
  );
};

export default Logo;
