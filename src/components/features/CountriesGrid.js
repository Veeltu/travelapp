import axios from "axios";
import { useState, useEffect, useRef } from "react";
import CountriesCards from "./CountreisCards";
import FilterByName from "./FilterByName";
import FilterByContinent from "./FilterByContinent";
import CountriesDetails from "./CountriesDetails";
import InfiniteScroll from "react-infinite-scroll-component";

const url = "https://restcountries.com/v3.1/";

function CountriesGrid() {
  const [jsonData, setJsonData] = useState([]);
  const [filterByContinent, setFilterByContinent] = useState("All");
  const [inputTextToFilter, setInputTextToFilter] = useState("");
  const [finalFilerToCardsGrid, setFilterToCardsGrid] = useState([]);

  // This value stores data from filter name for detail page
  const [nameFilter, setNameFilter] = useState();

  const [dataForDetailPage, setDataForDetailPage] = useState([]);
  const [detailPageView, setDetailPageView] = useState(false);

  //fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get(url + "all");
        setJsonData(resp.data);
        setFilterToCardsGrid(resp.data);
      } catch (error) {
        console.log(error.data);
      }
    };
    getData();
  }, []);

  //filter for one country match with "nameFilter"
  useEffect(() => {
    let detailData = [];
    if (nameFilter !== [])
      // ???
      detailData = jsonData.filter((e) => e.name.common === nameFilter);
    setDataForDetailPage(detailData);
    toggle();
  }, [nameFilter]);

  const changeCountry = (e) => {
    const a = e.currentTarget.textContent;
    const detailData = jsonData.filter((e) => e.name.common === a);
    setDataForDetailPage(detailData);
  };

  //filterByContinent
  useEffect(() => {
    let result = jsonData;
    if (filterByContinent !== "All")
      result = result.filter((e) => e.region === filterByContinent);
    setFilterToCardsGrid(result);
  }, [filterByContinent]);

  //name filter
  useEffect(() => {
    const filteredData = jsonData.filter((e) => {
      return e.name.common.toLowerCase().includes(inputTextToFilter);
    });
    setFilterToCardsGrid(filteredData);
  }, [inputTextToFilter]);

  const toggle = () => setDetailPageView((wasOpened) => !wasOpened);
  const resetDetailState = () => setNameFilter(undefined);

  //close details => outside click and ESC
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (myRef.current === null) {
      console.log("null");
    } else if (!myRef.current.contains(e.target)) {
      setNameFilter(undefined);
    } 
  };
  const handleEscapeClose = (e) => {
    if ( e.key === "Escape") {
      setNameFilter(undefined)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);
    document.addEventListener("mousedown", handleClickOutside);
    console.log("effect");
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center align-middle ">
        {detailPageView ? (
          <></>
        ) : (
          <>
            <div
              className="flex justify-center align-middle"
              ref={myRef}
              onClick={handleClickOutside}
            >
              <CountriesDetails
                data={dataForDetailPage}
                jsonData={jsonData}
                button={resetDetailState}
                setNameFilter={changeCountry}
              />
            </div>
          </>
        )}
        <div className="flex flex-col items-center justify-between w-full px-4 py-6 mx-auto h-9 sm:flex-row max-w-7xl">
          <FilterByName
            setInputTextToFilter={setInputTextToFilter}
            inputTextToFilter={inputTextToFilter}
          />
          <FilterByContinent
            setFilterByContinent={setFilterByContinent}
            filterByContinent={filterByContinent}
          />
        </div>
        <div className="flex items-center justify-between w-full px-12 py-10 mx-auto max-w-7xl">
          <>
            <div className="cursor-pointer ">
              <CountriesCards
                data={finalFilerToCardsGrid}
                setNameFilter={setNameFilter}
              />
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default CountriesGrid;
