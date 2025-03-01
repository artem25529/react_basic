import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../pages/PageWrapper.jsx';

import validationService from '../services/validationService.js';

import '../styles/Post.css';

function Post({ post }) {
  const { user } = useContext(UserContext);

  const postTextRef = useRef();

  const postEditFormRef = useRef();

  const applyBtnRef = useRef();
  const loaderRef = useRef();

  const [isEdit, setIsEdit] = useState(false);

  const [values, setValues] = useState({
    title: post.title,
    text: post.text,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      setTextareaHeight();
    }
  }, [isEdit]);

  useEffect(() => {
    applyBtnRef.current.disabled =
      values.title === post.title && values.text === post.text;
  }, [values]);

  function setTextareaHeight() {
    postTextRef.current.style.height = '';
    postTextRef.current.style.height = postTextRef.current.scrollHeight + 'px';
  }

  function handleValueChange(e) {
    console.log('change');

    setTextareaHeight();

    const input = e.target;
    setValues((prev) => ({ ...prev, [input.name]: input.value }));
  }

  async function handleFormSubmit(e) {
    loaderRef.current.style.display = 'grid';
    e.preventDefault();
    console.log('submit');

    if (applyBtnRef.current.disabled) return;

    await validationService.validatePostEditForm(
      postEditFormRef.current,
      setErrors,
    );

    loaderRef.current.style.display = 'none';
  }

  function handleEditBtn() {
    setValues({
      title: post.title,
      text: post.text,
    });
    setErrors({});
    setIsEdit(true);
  }

  function handleCancelBtn() {
    setIsEdit(false);
  }

  return (
    <article
      className={'post' + (user ? ' extended' : '') + (isEdit ? ' edit' : '')}
      data-id={post.id}
    >
      <div ref={loaderRef} className="loader">
        Loading ...
      </div>
      <div className="post-content">
        <form
          ref={postEditFormRef}
          id="post-form"
          className="post-content-wrapper"
          onSubmit={handleFormSubmit}
          noValidate
          data-post-id={post.id}
        >
          <header className="post-title-wrapper">
            <input
              className="post-title"
              type="text"
              name="title"
              value={values.title}
              onChange={handleValueChange}
              required
              minLength="2"
              maxLength="100"
            />
          </header>
          <div className="err">{errors.title}</div>
          <textarea
            className="post-text"
            ref={postTextRef}
            name="text"
            value={values.text}
            onChange={handleValueChange}
            required
            minLength="5"
            maxLength="500"
          />
          <div className="err">{errors.text}</div>
        </form>

        <div id="post-box" className="post-content-wrapper">
          <header className="post-title-wrapper">
            <h3 className="post-title">{post.title}</h3>
          </header>
          <div className="post-text">{post.text}</div>
        </div>

        <div className="post-favorite">
          <span className="material-symbols-outlined">favorite</span>
        </div>
      </div>

      <div className="post-controls">
        <div className="post-control edit">
          <div className="edit-control-wrapper">
            <span className="material-symbols-outlined" onClick={handleEditBtn}>
              edit_square
            </span>
          </div>
          <div className="submit-control-wrapper">
            <button
              ref={applyBtnRef}
              className="post-form-submit-btn"
              type="submit"
              form="post-form"
            >
              <span className="material-symbols-outlined">check</span>
            </button>
            <span
              className="material-symbols-outlined"
              onClick={handleCancelBtn}
            >
              cancel
            </span>
          </div>
        </div>
        <div className="post-control remove">
          <span className="material-symbols-outlined">delete</span>
        </div>
      </div>

      <div className="post-statistics">
        <div className="post-statistic views">
          <span className="material-symbols-outlined statistic-icon">
            visibility
          </span>
          <span className="statistic-value">{post.statistics.views}</span>
        </div>
        <div className="post-statistic likes">
          <span className="material-symbols-outlined statistic-icon">
            thumb_up
          </span>
          <span className="statistic-value">{post.statistics.likes}</span>
        </div>
        <div className="post-statistic dislikes">
          <span className="material-symbols-outlined statistic-icon">
            thumb_down
          </span>
          <span className="statistic-value">{post.statistics.dislikes}</span>
        </div>
      </div>
    </article>
  );
}

export default Post;
