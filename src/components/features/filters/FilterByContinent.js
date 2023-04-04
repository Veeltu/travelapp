import React from "react";

function FilterByContinent({  setFilterByContinent,filterByContinent }) {
  //list of cont. for filter
  const continents = [
    "All",
    "Asia",
    "Americas",
    "Africa",
    "Europe",
    "Oceania",
  ];

  return (
    <div>
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

// className="block w-full max-w-sm py-2 pr-3 border-none rounded-md shadow-xl bg-White border-slate-300 pl-9 sm:text-sm"
