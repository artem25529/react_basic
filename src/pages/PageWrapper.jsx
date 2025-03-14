import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import PopupMessage from '../components/PopupMessage.jsx';
import FullscreenPopup from '../components/FullscreenPopup.jsx';
import Advert from '../components/Advert.jsx';
import themeService from '../services/themeService.js';
import '../styles/PageWrapper.css';
import userService from '../services/userService.js';
import Loader from '../components/Loader.jsx';

const PageWrapperContext = createContext();

function PageWrapper() {
  const [user, setUser] = useState(localStorage.getItem('loggedInUser'));
  const [favorites, setFavorites] = useState([]);

  const [successMsg, setSuccessMsg] = useState();
  const [successMsgMillis, setSuccessMsgMillis] = useState();
  const [successMsgCallback, setSuccessMsgCallback] = useState();

  const [errorMsg, setErrorMsg] = useState();
  const [errorMsgMillis, setErrorMsgMillis] = useState();
  const [errorMsgCallback, setErrorMsgCallback] = useState();

  const [fullscreenPopupContent, setFullscreenPopupContent] = useState();

  const [response, setResponse] = useState({
    pages: null,
    data: null,
    error: null,
    isInProgress: false,
    isDone: false,
  });

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
    localStorage.setItem('loggedInUser', user);
    themeService.applyCurrentTheme(user);

    if (user) {
      userService.getUser(user, setResponse);
    }
  }, [user]);

  useEffect(() => {
    if (response.isDone) {
      if (response.error) {
        setErrorMsg('Error loading a user');
      } else if (response.data) {
        if (response.data.length === 0) {
          setErrorMsg(`User ${user} not found`);
        } else {
          setFavorites(response.data[0].favorites ?? []);
        }
      }
    }
  }, [response]);

  return (
    <PageWrapperContext.Provider
      value={{
        user,
        setUser,
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
        {response.isInProgress && (
          <Loader
            contentStyle={{ position: 'fixed', top: '45vh' }}
            text="Loading data"
            spinner={2}
            background={true}
          />
        )}

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
