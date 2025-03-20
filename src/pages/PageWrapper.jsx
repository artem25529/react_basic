import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import PopupMessage from '../components/PopupMessage.jsx';
import FullscreenPopup from '../components/FullscreenPopup.jsx';
import Advert from '../components/Advert.jsx';
import themeService from '../services/themeService.js';
import localStorageService from '../services/localStorageService.js';
import '../styles/PageWrapper.css';

const PageWrapperContext = createContext();

function PageWrapper() {
  const [user, setUser] = useState(localStorageService.getLoggedInUser());
  const [theme, setTheme] = useState();
  const [favorites, setFavorites] = useState([]);

  const [successMsg, setSuccessMsg] = useState();
  const [successMsgMillis, setSuccessMsgMillis] = useState();
  const [successMsgCallback, setSuccessMsgCallback] = useState();

  const [errorMsg, setErrorMsg] = useState();
  const [errorMsgMillis, setErrorMsgMillis] = useState();
  const [errorMsgCallback, setErrorMsgCallback] = useState();
  const [fullscreenPopupContent, setFullscreenPopupContent] = useState();

  function successPopupResetCallback() {
    setSuccessMsg();
    setSuccessMsgCallback();
    setSuccessMsgMillis();
  }

  function errorPopupResetCallback() {
    setErrorMsg();
    setErrorMsgCallback();
    setErrorMsgMillis();
  }

  useEffect(() => {
    localStorageService.setLoggedInUser(user);
    setTheme(themeService.getThemeForUser(user));
    setFavorites(user?.favorites ? user.favorites : []);
  }, [user]);

  useEffect(() => {
    themeService.applyTheme(user, theme);
  }, [theme]);

  return (
    <PageWrapperContext.Provider
      value={{
        user,
        setUser,
        theme,
        setTheme,
        favorites,
        setFavorites,
        setSuccessMsg,
        setSuccessMsgCallback,
        setSuccessMsgMillis,
        setErrorMsg,
        setErrorMsgCallback,
        setErrorMsgMillis,
        setFullscreenPopupContent,
      }}
    >
      {successMsg && (
        <PopupMessage
          key={'success-msg-' + new Date().getTime()}
          level="success"
          message={successMsg}
          resetCallback={successPopupResetCallback}
          milliseconds={successMsgMillis}
          callback={successMsgCallback}
        />
      )}

      {errorMsg && (
        <PopupMessage
          key={'error-msg-' + new Date().getTime()}
          level="error"
          message={errorMsg}
          resetCallback={errorPopupResetCallback}
          milliseconds={errorMsgMillis}
          callback={errorMsgCallback}
        />
      )}

      {fullscreenPopupContent && (
        <FullscreenPopup setFullscreenPopupContent={setFullscreenPopupContent}>
          {fullscreenPopupContent}
        </FullscreenPopup>
      )}

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
    </PageWrapperContext.Provider>
  );
}

export default PageWrapper;
export { PageWrapperContext };
