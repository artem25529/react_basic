import { useState, memo } from 'react';
import SortAndSearch from '../components/SortAndSearch.jsx';
import PostListWrapper from '../components/PostListWrapper.jsx';
import { Link } from 'react-router-dom';

function Blog(props) {
  console.log('render blog');
  console.log(props.history);
  const [searchParams, setSearchParams] = useState(() => {
    const query = localStorage.getItem('query');
    const sort = localStorage.getItem('sort');
    const order = localStorage.getItem('order');

    return { query, sort, order };
  });

  return (
    <section className="blog">
      <div className="add-new-post-wrapper">
        <Link to="/new-post">Add new post</Link>
      </div>
      <SortAndSearch
        query={searchParams.query}
        setSearchParams={setSearchParams}
      />
      <PostListWrapper searchParams={searchParams} />
    </section>
  );
}

export default Blog;
