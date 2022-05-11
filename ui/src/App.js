import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/auth';
import Logo from './lib/Logo';
import NavLinks from './lib/NavLinks';
import About from './pages/About';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <header className='header'>
          <nav className='header-nav'>
            <Logo />
            <NavLinks />
          </nav>
        </header>
        <main className='main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<About />} />
          </Routes>
        </main>
        <footer className='footer'>
          <p className='footer-text'>Copyright &copy; 2022</p>
        </footer>
      </AuthProvider>
    </Router>
  );
};

export default App;
