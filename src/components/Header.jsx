import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { PageWrapperContext } from '../pages/PageWrapper.jsx';
import '../styles/Header.css';

function Header() {
  const { user, setUser } = useContext(PageWrapperContext);

  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    setUser();
  }

  return (
    <header className="page-header">
      <Link className="logo-container" to="/">
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
            <NavLink className="btn" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="btn" to="/blog">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink className="btn" to="/favorites">
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="right-content-wrapper">
        <section className="theme-switcher">
          <div className="theme dark btn">
            <div className="theme-label">Dark</div>
            <span className="material-symbols-outlined">dark_mode</span>
          </div>
          {/* <div className="theme light">
            <div className="theme-label">Light</div>
            <span className="material-symbols-outlined">light_mode</span>
          </div> */}
        </section>

        {user ? (
          <section className="user-wrapper">
            <div className="username">{user}</div>
            <button onClick={handleLogout} type="button" className="logout btn">
              Log Out
            </button>
          </section>
        ) : (
          <section className="login-wrapper">
            <Link to="/login" className="login btn">
              Log In
            </Link>
            <Link to="/signup" className="signup btn">
              Sign Up
            </Link>
          </section>
        )}
      </div>
    </header>
  );
}

export default Header;
