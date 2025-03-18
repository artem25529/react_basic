import { useEffect, useState } from 'react';
import urlUtils from '../utils/urlUtils.js';
import '../styles/SortAndSearch.css';
import { Link } from 'react-router-dom';

function SortAndSearch({ searchParams, setSearchParams }) {
  const [input, setInput] = useState(searchParams.query);
  const [tOut, setTOut] = useState();

  useEffect(() => {
    if (input !== searchParams.query) {
      handleQueryChange();
    }
  }, [input]);

  function handleSortChange(e) {
    const targetField = e.currentTarget;
    console.log(targetField);

    const sortFields = targetField.closest('.sort-fields').children;

    for (const field of sortFields) {
      const isSameNode = field.isSameNode(targetField);
      const sortOrder = field.dataset.order;

      field.classList.toggle('active', isSameNode && sortOrder !== 'desc');

      if (field.classList.contains('active')) {
        field.dataset.order = sortOrder ? 'desc' : 'asc';
      } else {
        delete field.dataset.order;
      }
    }

    const activeField = document.querySelector('.sort-field.active');

    const sort = activeField?.dataset?.field;
    const order = activeField?.dataset?.order;

    if (sort) {
      urlUtils.changeQuery({
        sort: { operation: 'set', value: sort },
        order: { operation: 'set', value: order },
      });
    } else {
      urlUtils.changeQuery({
        sort: { operation: 'delete' },
        order: { operation: 'delete' },
      });
    }

    setSearchParams((prev) => ({ ...prev, sort: sort, order: order }));
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleQueryChange() {
    if (tOut) {
      clearTimeout(tOut);
    }

    setTOut(
      setTimeout(() => {
        changeQuery(input);
      }, 1000),
    );
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (tOut) {
      clearTimeout(tOut);
    }

    changeQuery(input);
  }

  function changeQuery(value) {
    if (value) {
      urlUtils.changeQuery({ query: { operation: 'set', value: value } });
    } else {
      urlUtils.changeQuery({ query: { operation: 'delete' } });
    }

    setSearchParams((prev) => ({ ...prev, query: value }));
  }

  return (
    <section className="sort-search-container">
      <div className="add-new-post-wrapper">
        <Link to="/new-post">Add new post</Link>
      </div>
      <div className="sort-wrapper">
        <div className="sort-title">Sorting:</div>
        <div className="sort-fields">
          <div
            data-field="views"
            className="sort-field"
            onClick={handleSortChange}
          >
            <span className="material-symbols-outlined sort">visibility</span>
            <span className="material-symbols-outlined placeholder">
              swap_vert
            </span>
            <span data-order="asc" className="material-symbols-outlined order">
              straight
            </span>
            <span data-order="desc" className="material-symbols-outlined order">
              straight
            </span>
          </div>
          <div
            data-field="likes"
            className="sort-field"
            onClick={handleSortChange}
          >
            <span className="material-symbols-outlined sort">thumb_up</span>
            <span className="material-symbols-outlined placeholder">
              swap_vert
            </span>
            <span data-order="asc" className="material-symbols-outlined order">
              straight
            </span>
            <span data-order="desc" className="material-symbols-outlined order">
              straight
            </span>
          </div>
        </div>
      </div>
      <form className="search-wrapper" onSubmit={handleFormSubmit}>
        <label htmlFor="search">
          <span className="material-symbols-outlined">search</span>
        </label>
        <input
          type="search"
          id="search"
          placeholder="Search"
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </section>
  );
}

export default SortAndSearch;
