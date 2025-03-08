import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import themeService from '../services/themeService.js';
import '../styles/PageWrapper.css';
import Advert from '../components/Advert.jsx';

const UserContext = createContext();

function PageWrapper() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(localStorage.getItem('loggedInUser'));
  }, []);

  useEffect(() => {
    themeService.applyCurrentTheme(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <section className="page-wrapper">
        <Header />
        <div className="page-content-wrapper">
          <Advert />
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
