import {
  useState,
  useEffect,
  useDeferredValue,
  useMemo,
  memo,
  useRef,
} from 'react';
import PostList from './PostList.jsx';
import postService from '../services/PostService.js';

function PostListWrapper({ searchParams }) {
  console.log('wrapper');

  const [flag, setFlag] = useState(true);

  const prevSearchParams = useRef(searchParams);

  const [page, setPage] = useState(1);

  const prevPage = useRef(page);

  const [isFirstRender, setIsFirstRender] = useState(true);

  const [lastPost, setLastPost] = useState(null);
  const [postList, setPostList] = useState([]);

  const [response, setResponse] = useState({
    pages: null,
    data: null,
    error: null,
    isDone: false,
  });

  const intersectionObserver = useMemo(() => {
    if (!lastPost) {
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const lastPostEntry = entries[0];

        if (lastPostEntry.isIntersecting) {
          setPage((curr) => response.pages.next ?? curr);

          observer.unobserve(lastPostEntry.target);
          observer.disconnect();
        }
      },
      { threshold: 1 },
    );

    return observer;
  }, [lastPost]);

  useEffect(() => {
    console.log('change params');

    if (prevSearchParams.current !== searchParams) {
      console.log('123');

      prevSearchParams.current == searchParams;
      setPage(page === 0 ? 1 : 0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (intersectionObserver) {
      intersectionObserver.observe(lastPost);
    }
  }, [intersectionObserver]);

  useEffect(() => {
    postService.getPosts(searchParams, page, 5, setResponse);
  }, [page]);

  useEffect(() => {
    if (response.isDone && response.data) {
      if (page <= 1) {
        setPostList([...Object.values(response.data)]);
      } else {
        setPostList((curr) => [...curr, ...Object.values(response.data)]);
      }
    }
  }, [response]);
  return (
    <>
      {postList.length > 0 && <PostList posts={postList} ref={setLastPost} />}
      {!response.isDone && 'Loading...'}
    </>
  );
}

export default PostListWrapper;
