import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
  return (
    <article className='hero'>
      <h2 className='hero-title'>Welcome To The Todos Project</h2>
      <p className='hero-text'>
        This is a fullstack project using the MERN stack. This is a project that
        uses the latest technologies in the MERN stack and focusing on the major
        areas of web development including authentication and authorization
        using cookies and JWT, making REST API resources using Nodejs and
        Expressjs, using CRUD operations to Mongodb and rendering views using
        Reactjs.
      </p>
      <div className='hero-cta'>
        <Link to='/login'>
          <Button text='Get Started' color='greenish' />
        </Link>
      </div>
    </article>
  );
};

export default Hero;
