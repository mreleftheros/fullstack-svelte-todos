import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logo from './lib/Logo';
import NavLinks from './lib/NavLinks';

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
        <h2>main</h2>
      </main>
      <footer className='footer'>
        <h2>footer</h2>
      </footer>
    </Router>
  );
};

export default App;
