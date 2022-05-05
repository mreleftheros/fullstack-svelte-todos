import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logo from './lib/Logo';
import NavLinks from './lib/NavLinks';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <header className='header'>
        <nav className='header-nav'>
          <Logo />
          <NavLinks />
        </nav>
      </header>
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      <footer className='footer'>
        <p className='footer-text'>Copyright &copy; 2022</p>
      </footer>
    </Router>
  );
};

export default App;
