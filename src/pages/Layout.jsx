import '../styles/Layout.css';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="page">
      <header className="page-header">
        <a className="logo-container" href="#">
          <img
            className="logo-img"
            src="https://img.icons8.com/pulsar-color/240/chat-message.png"
            alt="site logo"
          />
          &nbsp;&nbsp;
          <div className="logo-legend">WriteWave</div>
        </a>
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <a href="#">News</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="page-main">
        <Outlet />
      </main>
      <footer className="page-footer">Footer</footer>
    </div>
  );
}

export default Layout;
