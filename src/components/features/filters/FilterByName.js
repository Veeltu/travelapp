function FilterByName({ setInputTextToFilter, inputTextToFilter }) {
  return (
    <div>
      <div className="relative block ">
        <input
          value={inputTextToFilter}
          className="w-full max-w-xs input"
          placeholder="Search for a country..."
          name="search"
          id="id"
          type="text"
          onChange={(e) => setInputTextToFilter(e.target.value.toLowerCase())}
        />
      </div>
    </div>
  );
}

export default FilterByName;
