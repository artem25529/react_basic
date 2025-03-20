import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapperContext } from './PageWrapper.jsx';
import SortAndSearch from '../components/SortAndSearch.jsx';
import PostListWrapper from '../components/PostListWrapper.jsx';
import localStorageService from '../services/localStorageService.js';
import urlUtils from '../utils/urlUtils.js';
import '../styles/Blog.css';

function Blog() {
  const { user } = useContext(PageWrapperContext);

  const [searchParams, setSearchParams] = useState(() => {
    const query = localStorageService.getItemForUser(user, 'query') ?? '';
    const sort = localStorageService.getItemForUser(user, 'sort');
    const order = localStorageService.getItemForUser(user, 'order');

    urlUtils.changeQuery({
      query: { operation: query ? 'set' : 'delete', value: query },
      sort: { operation: sort ? 'set' : 'delete', value: sort },
      order: { operation: order ? 'set' : 'delete', value: order },
    });

    return { query, sort, order };
  });

  return (
    <section className="blog-page">
      <div className="add-new-post-wrapper">
        <Link to="/new-post">Add new post</Link>
      </div>
      <SortAndSearch
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <PostListWrapper searchParams={searchParams} />
    </section>
  );
}

export default Blog;
