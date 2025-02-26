import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import postService from '../services/postService';
import '../styles/Favorites.css';

function Favorites() {
  const [postList, setPostList] = useState([]);

  const [page, setPage] = useState(1);

  const [response, setResponse] = useState({
    pages: null,
    data: null,
    error: null,
    isDone: false,
  });

  useEffect(() => {
    postService.getPosts(null, page, 5, setResponse);
  }, [page]);

  useEffect(() => {
    if (response.isDone && response.data) {
      setPostList(response.data);
    }
  }, [response]);

  let pagination;

  if (response.pages) {
    const pageNumbers = [];

    for (let i = 1; i <= response.pages.last; i++) {
      pageNumbers.push(i);
    }

    pagination = (
      <section className="pagination">
        {pageNumbers.map((n) => (
          <div key={n} className="page-link">
            {n}
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="favorites-page">
      {postList.length > 0 && <PostList posts={postList} />}
      {!response.isDone && 'Loading...'}
      {pagination && pagination}
    </section>
  );
}

export default Favorites;
