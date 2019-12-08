const Search = props => {
  return (
    <form className={`${props.className} product-search`}>
      <input
        type="text"
        placeholder="Search products..."
      />

      <button type="submit">
        <i className="fa fa-search" aria-label="Submit search" />
      </button>
    </form>
  );
};

export default Search;