import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../pages/PageWrapper.jsx';
import { BlogContext } from '../pages/Blog.jsx';
import Loader from '../components/Loader.jsx';
import PopupMessage from '../components/PopupMessage.jsx';
import validationService from '../services/validationService.js';
import postService from '../services/postService.js';

import '../styles/Post.css';

function Post({ post }) {
  const { user } = useContext(UserContext);
  const { setErrorMsg, setSuccessMsg, setFullscreenPopupContent } =
    useContext(BlogContext);

  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    title: post.title,
    text: post.text,
  });

  const [formValues, setFormValues] = useState({
    title: values.title,
    text: values.text,
  });

  const postEditFormRef = useRef();
  const postTextRef = useRef();
  const applyBtnRef = useRef();
  const fullscreenPopupDeleteBtnRef = useRef();
  const fullscreenPopupCancelBtnRef = useRef();

  useEffect(() => {
    if (isEdit) {
      setTextareaHeight();
    }
  }, [isEdit]);

  useEffect(() => {
    setBtnDisabled();
  }, [formValues]);

  function setBtnDisabled() {
    applyBtnRef.current.disabled =
      formValues.title === values.title && formValues.text === values.text;
  }

  function setTextareaHeight() {
    postTextRef.current.style.height = '';
    postTextRef.current.style.height = postTextRef.current.scrollHeight + 'px';
  }

  function handleValueChange(e) {
    setTextareaHeight();

    const input = e.target;
    setFormValues((prev) => ({ ...prev, [input.name]: input.value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (applyBtnRef.current.disabled) return;

    setIsLoading(true);

    try {
      await validationService.validatePostEditForm(
        postEditFormRef.current,
        setErrors,
      );
    } catch {
      setErrorMsg(`Error validating post with id ${post.id}.`);
      return;
    } finally {
      setIsLoading(false);
    }

    if (postEditFormRef.current.checkValidity()) {
      setIsLoading(true);

      try {
        await postService.updatePost({
          id: post.id,
          title: formValues.title,
          text: formValues.text,
        });

        setSuccessMsg(`Post with id ${post.id} updated successfully.`);
        setValues((prev) => ({ ...prev, ...formValues }));
        setIsEdit(false);
      } catch {
        setErrorMsg(`Error updatinng post with id ${post.id}.`);
      } finally {
        setIsLoading(false);
      }
    }
  }

  function handleEditBtn() {
    setBtnDisabled();
    setErrors({});
    setIsEdit(true);
  }

  function handleCancelBtn() {
    setFormValues({ title: values.title, text: values.text });
    setErrors({});
    setIsEdit(false);
  }

  function handleDeleteBtn() {
    setFullscreenPopupContent(
      <>
        <div className="post-delete-notification">
          <div className="delete-message">
            Are you sure you want to delete post with id {post.id}?
          </div>
          <div className="delete-controls">
            <button
              type="button"
              className="delete"
              onClick={handleApplyDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="cancel"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      </>,
    );
  }

  async function handleApplyDelete() {
    setFullscreenPopupContent();
    setIsLoading(true);

    try {
      await postService.deletePost(post.id);

      setIsDeleted(true);
      setSuccessMsg(`Post with id ${post.id} deleted successfully.`);
    } catch {
      setErrorMsg(`Error deleting post with id ${post.id}.`);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancelDelete() {
    setFullscreenPopupContent();
  }

  return (
    <>
      {!isDeleted && (
        <article
          className={
            'post' + (user ? ' extended' : '') + (isEdit ? ' edit' : '')
          }
          data-id={post.id}
        >
          {isLoading && (
            <Loader background={true} text="Processing" spinner={1} />
          )}

          <div className="post-content">
            <form
              ref={postEditFormRef}
              id={'post-form-' + post.id}
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
                  value={formValues.title}
                  onChange={handleValueChange}
                  required
                  minLength="2"
                  maxLength="100"
                />
              </header>
              {errors.title && <div className="err">{errors.title}</div>}
              <textarea
                className="post-text"
                ref={postTextRef}
                name="text"
                value={formValues.text}
                onChange={handleValueChange}
                required
                minLength="5"
                maxLength="500"
              />
              {errors.text && <div className="err">{errors.text}</div>}
            </form>

            <div id="post-box" className="post-content-wrapper">
              <header className="post-title-wrapper">
                <h3 className="post-title">{values.title}</h3>
              </header>
              <div className="post-text">{values.text}</div>
            </div>

            <div className="post-favorite">
              <span className="material-symbols-outlined">favorite</span>
            </div>
          </div>

          <div className="post-controls">
            <div className="post-control edit">
              <div className="edit-control-wrapper">
                <span
                  className="material-symbols-outlined"
                  onClick={handleEditBtn}
                >
                  edit_square
                </span>
              </div>
              <div className="submit-control-wrapper">
                <button
                  ref={applyBtnRef}
                  className="post-form-submit-btn"
                  type="submit"
                  form={'post-form-' + post.id}
                >
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
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
              <span
                className="material-symbols-outlined"
                onClick={handleDeleteBtn}
              >
                delete
              </span>
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
              <span className="statistic-value">
                {post.statistics.dislikes}
              </span>
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default Post;
