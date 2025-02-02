function SortAndFilter() {
  return (
    <section className="sortAndFilter">
      <div className="sort">
        <div className="title">Sorting:</div>
        <div className="fields">
          <div className="field">
            <span className="material-symbols-outlined">thumb_up</span>
            <span className="material-symbols-outlined">arrow_upward</span>
          </div>
          <div className="field">
            <span className="material-symbols-outlined">visibility</span>
            <span className="material-symbols-outlined">arrow_upward</span>
          </div>
        </div>
      </div>
      <div className="filter">
        <label htmlFor="search">Q</label>
        <input type="search" id="search" />
      </div>
    </section>
  );
}

export default SortAndFilter;
