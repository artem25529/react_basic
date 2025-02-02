import { forwardRef } from 'react';
import '../styles/PostList.css';
import Post from './Post.jsx';
import SortAndFilter from './SortAndFilter.jsx';

function PostList({ posts }, ref) {
  return (
    <>
      <SortAndFilter />
      <ul className="post-list">
        {posts.map((post, idx, arr) => (
          <li key={post.id} ref={arr.length - 1 === idx ? ref : null}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default forwardRef(PostList);
