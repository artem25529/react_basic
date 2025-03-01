import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import themeService from '../services/themeService.js';
import '../styles/PageWrapper.css';

const UserContext = createContext();

function PageWrapper() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(localStorage.getItem('loggedInUser'));
  }, []);

  useEffect(() => {
    themeService.setThemeFormCurrentUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <section className="page-wrapper">
        <Header />
        <div className="page-content-wrapper">
          <aside className="page-aside">
            <div className="page-advert">
              <img src="/advertisment.jpg" alt="advert" />
            </div>
          </aside>
          <main className="page-main">
            <Outlet />
          </main>
          <Footer />
        </div>
      </section>
    </UserContext.Provider>
  );
}

export default PageWrapper;
export { UserContext };
