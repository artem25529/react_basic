import { useState, useContext, useRef, createContext } from 'react';
import { UserContext } from './PageWrapper.jsx';
import SortAndSearch from '../components/SortAndSearch.jsx';
import PostListWrapper from '../components/PostListWrapper.jsx';
import PopupMessage from '../components/PopupMessage.jsx';
import FullscreenPopup from '../components/FullscreenPopup.jsx';
import localStorageService from '../services/localStorageService.js';
import '../styles/Blog.css';

const BlogContext = createContext();

function Blog() {
  const { user } = useContext(UserContext);

  const [searchParams, setSearchParams] = useState(() => {
    const query = localStorageService.getItemForUser(user, 'query') ?? '';
    const sort = localStorageService.getItemForUser(user, 'sort');
    const order = localStorageService.getItemForUser(user, 'order');

    return { query, sort, order };
  });

  const [successMsg, setSuccessMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [fullscreenPopupContent, setFullscreenPopupContent] = useState();

  const successPopupRef = useRef();
  const errorPopupRef = useRef();

  function successPopupCloseCallback() {
    setSuccessMsg();
  }

  function errorPopupCloseCallback() {
    setErrorMsg();
  }

  return (
    <>
      {successMsg && (
        <PopupMessage
          key={'success-msg-' + new Date().getTime()}
          ref={successPopupRef}
          level="success"
          message={successMsg}
          callback={successPopupCloseCallback}
        />
      )}

      {errorMsg && (
        <PopupMessage
          key={'error-msg-' + new Date().getTime()}
          ref={errorPopupRef}
          level="error"
          message={errorMsg}
          callback={errorPopupCloseCallback}
        />
      )}

      {fullscreenPopupContent && (
        <FullscreenPopup>{fullscreenPopupContent}</FullscreenPopup>
      )}

      <BlogContext.Provider
        value={{ setSuccessMsg, setErrorMsg, setFullscreenPopupContent }}
      >
        <section className="blog-page">
          <SortAndSearch
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          <PostListWrapper
            searchParams={searchParams}
            setErrorMsg={setErrorMsg}
            setSuccessMsg={setSuccessMsg}
          />
        </section>
      </BlogContext.Provider>
    </>
  );
}

export default Blog;
export { BlogContext };
