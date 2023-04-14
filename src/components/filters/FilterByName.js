import { useEffect, useState } from "react";

function FilterByName({jsonData, setFilterResults }) {
  
  const [inputTextToFilter, setInputTextToFilter] = useState("");

  useEffect(() => {
    const filteredData = jsonData.filter((e) => {
      return e.name.common.toLowerCase().includes(inputTextToFilter);
    });
    setFilterResults(filteredData);
  }, [inputTextToFilter]);

  return (
    <div>
      <div className="flex justify-center">
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
