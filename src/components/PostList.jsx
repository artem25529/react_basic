import { forwardRef } from 'react';
import Post from './Post.jsx';
import '../styles/PostList.css';

function PostList({ posts }, ref) {
  return (
    <ul className="post-list">
      {posts.map((post, idx, arr) => (
        <li key={post.id} ref={arr.length - 1 === idx ? ref : null}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

export default forwardRef(PostList);
