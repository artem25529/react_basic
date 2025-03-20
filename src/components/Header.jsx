import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PageWrapperContext } from '../pages/PageWrapper.jsx';
import '../styles/Header.css';

function Header() {
  const { user, setUser, theme, setTheme } = useContext(PageWrapperContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    setUser();
    navigate('/login');
  }

  function handleThemeChange() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <header className="page-header">
      <Link className="logo-container" to="/blog">
        <img
          className="logo-img"
          src="https://img.icons8.com/pulsar-color/240/chat-message.png"
          alt="site logo"
        />
        <span className="logo-legend">WriteWave</span>
      </Link>

      <nav className="navigation">
        <ul>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
          <li>
            <NavLink to="/favorites">Favorites</NavLink>
          </li>
        </ul>
      </nav>

      <div className="right-content-wrapper">
        <section className="theme-switcher">
          {theme === 'dark' && (
            <div className="theme light" onClick={handleThemeChange}>
              <span className="theme-label">Light</span>
              <span className="material-symbols-outlined theme-icon">
                light_mode
              </span>
            </div>
          )}

          {theme === 'light' && (
            <div className="theme dark" onClick={handleThemeChange}>
              <span className="theme-label">Dark</span>
              <span className="material-symbols-outlined theme-icon">
                dark_mode
              </span>
            </div>
          )}
        </section>

        {user ? (
          <section className="user-wrapper">
            <div className="username">{user.email}</div>
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
      </div>
    </header>
  );
}

export default Header;
