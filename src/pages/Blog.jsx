import { useEffect, useMemo, useState, memo } from 'react';
import PostList from '../components/PostList.jsx';
import postService from '../services/PostService.js';

function Blog() {
  const [page, setPage] = useState(1);

  const [lastPost, setLastPost] = useState(null);
  const [postList, setPostList] = useState([]);

  const [response, setResponse] = useState({
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
          setPage((curr) => response.data.next ?? curr);

          observer.unobserve(lastPostEntry.target);
          observer.disconnect();
        }
      },
      { threshold: 0.8 },
    );

    return observer;
  }, [lastPost]);

  useEffect(() => {
    if (intersectionObserver) {
      intersectionObserver.observe(lastPost);
    }
  }, [intersectionObserver]);

  useEffect(() => {
    postService.getPosts(5, page, setResponse);
  }, [page]);

  useEffect(() => {
    if (response.isDone && response.data) {
      setPostList((curr) => [...curr, ...Object.values(response.data.data)]);
    }
  }, [response]);

  return (
    <section className="blog">
      {postList.length > 0 && <PostList ref={setLastPost} posts={postList} />}
      {/* {error && error.message}
      {!isDone && 'loading...'} */}
    </section>
  );
}

export default memo(Blog);
