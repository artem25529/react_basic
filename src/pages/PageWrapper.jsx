import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import themeService from '../services/themeService.js';
import '../styles/PageWrapper.css';
import Advert from '../components/Advert.jsx';
import AboutSkeleton from './AboutSkeleton.jsx';
import BlogSkeleton from './BlogSkeleton.jsx';
import FavoritesSkeleton from './FavoritesSkeleton.jsx';
import LoginSkeleton from './LoginSkeleton.jsx';
import NewPostSkeleton from './NewPostSkeleton.jsx';
import Skeleton, {
  ImagePlaceholder,
  PostSkeleton,
} from '../components/Skeleton.jsx';

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
            <LoginSkeleton />
          </main>
          <Footer />
        </div>
      </section>
    </UserContext.Provider>
  );
}

export default PageWrapper;
export { UserContext };
