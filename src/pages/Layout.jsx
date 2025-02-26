import { createContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/Layout.css';
import { Outlet } from 'react-router-dom';

const UserContext = createContext();

function Layout() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(localStorage.getItem('loggedInUser'));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="page">
        <Header />
        <main className="page-main">
          <Outlet />
        </main>
        <footer className="page-footer">Footer</footer>
      </div>
    </UserContext.Provider>
  );
}

export default Layout;
export { UserContext };
