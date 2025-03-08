import { useState, useEffect, useMemo, useRef } from 'react';
import PostList from './PostList.jsx';
import PopupMessage from '../components/PopupMessage.jsx';
import Loader from '../components/Loader.jsx';
import postService from '../services/postService.js';
import windowUtils from '../services/windowUtils.js';

function PostListWrapper({ searchParams }) {
  const [page, setPage] = useState(1);
  const [postList, setPostList] = useState([]);
  const [lastPost, setLastPost] = useState();

  const [response, setResponse] = useState({
    pages: null,
    data: null,
    error: null,
    isInProgress: false,
    isDone: false,
  });

  const prevSearchParams = useRef(searchParams);
  const prevObserver = useRef();

  const intersectionObserver = useMemo(() => {
    if (prevObserver.current) {
      prevObserver.current.disconnect();
    }

    if (!lastPost) {
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const lastPostEntry = entries[0];

        if (lastPostEntry.isIntersecting) {
          setPage((curr) => response?.pages?.next ?? curr);

          observer.unobserve(lastPostEntry.target);
          observer.disconnect();
        }
      },
      { threshold: 1 },
    );

    prevObserver.current = observer;
    return observer;
  }, [lastPost]);

  useEffect(() => {
    if (prevSearchParams.current !== searchParams) {
      prevSearchParams.current == searchParams;
      setPage(page === 0 ? 1 : 0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (intersectionObserver && lastPost) {
      intersectionObserver.observe(lastPost);
    }
  }, [intersectionObserver]);

  useEffect(() => {
    postService.getPosts(searchParams, page, 5, setResponse);
  }, [page]);

  useEffect(() => {
    if (response.isInProgress) {
      windowUtils.toggleWindowScroll(false);
    } else if (response.isDone) {
      windowUtils.toggleWindowScroll(true);
    }

    if (response.isDone && response.data) {
      if (page <= 1) {
        setPostList([...response.data]);
      } else {
        setPostList((curr) => [...curr, ...response.data]);
      }
    }
  }, [response]);

  useEffect(() => {
    if (response.isInProgress && page > 1) {
      windowUtils.scrollDown();
    }
  }, []);
  return (
    <>
      {response.isDone && response.error && (
        <PopupMessage level="error" message="Error loading posts." />
      )}

      {postList.length > 0 && <PostList posts={postList} ref={setLastPost} />}

      {response.isInProgress && (
        <Loader background={page <= 1} text="Loading posts..." spinner={1} />
      )}

      {response.isDone && response.data && postList.length === 0 && (
        <div className="posts-not-found-msg">Posts were not found.</div>
      )}
    </>
  );
}

export default PostListWrapper;
