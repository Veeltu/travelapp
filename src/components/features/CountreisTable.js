import React, { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const CountriesTable = ({ data, setNameFilter, setHoverData }) => {
  const [showButton, setShowButton] = useState(false);
  const tableRef = useRef(null);

  const handleTableClick = (e) => {
    const a = e.currentTarget.dataset.id;
    setHoverData("");
    setNameFilter(a);
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop >= 2000) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleBackToTopClick = () => {
    tableRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <InfiniteScroll dataLength={data.length}>
        <div
          style={{ height: "500px", overflow: "auto" }}
          onScroll={handleScroll}
          ref={(node) => (tableRef.current = node)}
        >
          <table className="table text-xs">
            <thead className="sticky top-0 z-10">
              <tr>
                <th>flag</th>
                <th>country name</th>
                <th>region</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e) => (
                <tr
                  className="hover"
                  onClick={(e) => handleTableClick(e)}
                  onMouseEnter={() => setHoverData(e)}
                  onMouseLeave={() => setHoverData("")}
                  key={e.name.common}
                  data-id={e.name.common}
                >
                  <td className="">
                    <div className="w-8 h-8 mask mask-squircle">
                      <img className="" alt="flag" src={e.flags.png}></img>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold overflow-hidden">
                      <h2>{e.name.common}</h2>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold ">{e.region}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
      {showButton && (
        <button
          className="fixed text-2xl text-gray-700 hover:text-gray-900 z-20"
          onClick={handleBackToTopClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default CountriesTable;
