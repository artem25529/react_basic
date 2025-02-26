import '../styles/NewPost.css';

function NewPost() {
  return (
    <section className="new-post-page">
      <div className="new-post-wrapper">
        <div className="new-post-title">Create New Post</div>
        <form className="new-post-form">
          <div className="new-post-field">
            <label htmlFor="post-title">Post Title</label>
            <input
              type="text"
              id="post-title"
              name="post-title"
              required
              minLength="2"
              maxLength="100"
            />
          </div>
          <div className="new-post-field">
            <label htmlFor="post-text">Post Text</label>
            <textarea
              id="post-text"
              name="post-text"
              required
              minLength="10"
              maxLength="250"
            />
          </div>
        </form>
        <button type="submit" form="new-post-form">
          Create Post
        </button>
      </div>
    </section>
  );
}

export default NewPost;
