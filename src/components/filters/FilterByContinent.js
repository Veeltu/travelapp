import { useState, useEffect } from "react";


function FilterByContinent({ jsonData, setFilterResult }) {

  const [filterByContinent, setFilterByContinent] = useState("All");

  //list of cont. for filter
  const continents = [
    "All",
    "Asia",
    "Americas",
    "Africa",
    "Europe",
    "Oceania",
  ];

  useEffect(() => {
    let result = jsonData;
    if (filterByContinent !== "All")
      result = result.filter((e) => e.region === filterByContinent);
    setFilterResult(result);
  }, [filterByContinent]);

  return (
    <div className="flex justify-center">
      <select
        onChange={(e) =>  setFilterByContinent(e.target.value)}
        className="w-full max-w-xs select"
        value={filterByContinent}
      >
        {continents.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterByContinent;
