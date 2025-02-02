import '../styles/Post.css';

function Post({ post }) {
  return (
    <article className="post">
      <h3 className="post-title">{post.title}</h3>
      <div className="post-text">{post.text}</div>
      <div className="post-statistics">
        <div className="st-part view-part">
          <span className="icon material-symbols-outlined">visibility</span>
          <span className="label">{post.statistics.views}</span>
        </div>
        <div className="st-part">
          <span className="icon material-symbols-outlined">thumb_up</span>
          <span className="label">{post.statistics.likes}</span>
        </div>
        <div className="st-part">
          <span className="icon material-symbols-outlined">thumb_down</span>
          <span className="label">{post.statistics.dislikes}</span>
        </div>
      </div>
    </article>
  );
}

export default Post;
