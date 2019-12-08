const Search = props => {
  return (
    <form className={`${props.className} product-search`}>
      <input
        type="text"
        placeholder="Search products..."
      />

      <select className="product-search__by-category">
        <option value="all">
          All Categories
        </option>
        
        <option>
          {/**One option for each category. */}
        </option>
      </select>

      <button type="submit">
        <i className="fa fa-search" aria-label="Submit search" />
      </button>
    </form>
  );
};

export default Search;