const SearchPerson = ({searchPattern, handleSearchInput}) => {
    return(
        <div>
        <h2>Filter shown with</h2>
        <input type="search" value={searchPattern} onChange={handleSearchInput} />
      </div>
    );
}

export default SearchPerson;