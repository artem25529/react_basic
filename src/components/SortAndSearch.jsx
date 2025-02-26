import { useEffect, useState } from 'react';
import urlUtils from '../utils/urlUtils.js';
import '../styles/SortAndSearch.css';

function SortAndSearch({ query, setSearchParams }) {
  const [input, setInput] = useState(query ?? '');
  const [tOut, setTOut] = useState();

  useEffect(() => {
    if (input !== query) {
      handleQueryChange();
    }
  }, [input]);

  function handleSortChange(e) {
    const sortIcon = e.target;
    const fields = sortIcon.closest('.sort-fields').children;

    for (const field of fields) {
      const containsSortIcon = field.contains(sortIcon);
      const sortOrder = field.dataset.order;

      field.classList.toggle(
        'active',
        containsSortIcon && sortOrder !== 'desc',
      );

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
      <div className="sort-wrapper">
        <div className="sort-title">Sorting:</div>
        <div className="sort-fields">
          <div data-field="views" className="sort-field">
            <span
              className="material-symbols-outlined sort"
              onClick={handleSortChange}
            >
              visibility
            </span>
            <span className="material-symbols-outlined placeholder">North</span>
            <span data-order="asc" className="material-symbols-outlined order">
              North
            </span>
            <span data-order="desc" className="material-symbols-outlined order">
              South
            </span>
          </div>
          <div data-field="likes" className="sort-field">
            <span
              className="material-symbols-outlined sort"
              onClick={handleSortChange}
            >
              thumb_up
            </span>
            <span className="material-symbols-outlined placeholder">North</span>
            <span data-order="asc" className="material-symbols-outlined order">
              North
            </span>
            <span data-order="desc" className="material-symbols-outlined order">
              South
            </span>
          </div>
        </div>
      </div>
      <div className="search-wrapper">
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
      </div>
    </section>
  );
}

export default SortAndSearch;
