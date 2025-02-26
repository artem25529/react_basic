import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../pages/Layout.jsx';
import '../styles/Header.css';

function Header() {
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    setUser();
  }

  return (
    <header className="page-header">
      <a className="logo-container" href="#">
        <img
          className="logo-img"
          src="https://img.icons8.com/pulsar-color/240/chat-message.png"
          alt="site logo"
        />
        <span className="logo-legend">WriteWave</span>
      </a>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>

      <section className="theme-switcher">
        <div className="theme dark">
          <div className="theme-label">Dark</div>
          <span className="material-symbols-outlined">dark_mode</span>
        </div>
        <div className="theme light">
          <div className="theme-label">Light</div>
          <span className="material-symbols-outlined">light_mode</span>
        </div>
      </section>

      {user ? (
        <section className="user-wrapper">
          <div className="username">{user}</div>
          <button onClick={handleLogout} type="button" className="logout">
            Log Out
          </button>
        </section>
      ) : (
        <section className="login-wrapper">
          <Link to="/login" className="login">
            Log In
          </Link>
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
        </section>
      )}
    </header>
  );
}

export default Header;
