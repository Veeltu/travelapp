import { useState, useRef } from "react";
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
    if (e.target.scrollTop >= 20) {
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
    <div className="relative ">
      <InfiniteScroll dataLength={data.length}>
        <div
          style={{ height: "500px", overflow: "auto" }}
          onScroll={handleScroll}
          ref={(node) => (tableRef.current = node)}
        >
          <table className="table w-full overflow-x-auto text-xs">
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
                  className="hover "
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
                  <td className="">
                    <div className="font-bold w-10 md:w-60  text-xs">
                      <h2>{e.name.common}</h2>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold text-xs">{e.region}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
      {showButton && (
        <button
          className="fixed text-2xl text-primary hover:text-secondary z-20  "
          onClick={handleBackToTopClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CountriesTable;
