import axios from "axios";
import { useState, useEffect, useRef } from "react";
import CountriesTable from "./CountreisTable";
import FilterByName from "./filters/FilterByName";
import FilterByContinent from "./filters/FilterByContinent";
import CountriesDetails from "./CountriesDetails";
// import InfiniteScroll from "react-infinite-scroll-component";
import MapChart from "./Map";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const url = "https://restcountries.com/v3.1/";

function CountriesGrid() {
  const [jsonData, setJsonData] = useState([]);
  // filters by name and continent
  const [filterByContinent, setFilterByContinent] = useState("All");
  const [inputTextToFilter, setInputTextToFilter] = useState("");
  const [finalFilerToCardsGrid, setFilterToCardsGrid] = useState([]);
  // name of coutry use to filter from big data
  const [nameFilter, setNameFilter] = useState();
  // array for detailPage
  const [dataForDetailPage, setDataForDetailPage] = useState([]);
  // show/ hide detailPage
  const [detailPageView, setDetailPageView] = useState(false);
  // state for tooltip
  const [targetCountries, setTargetCountries] = useState("");
  // coordinates for hover on table
  // const [hoverCoordinates, setHoverCoordiantes] = useState("");
  // console.log(hoverCoordinates);

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
    const detailData = jsonData.filter((e) => e.name.common === nameFilter);
    setDataForDetailPage(detailData);
    toggle();
    console.log("namefilter change");
  }, [nameFilter]);

  //function => click on map show detail page of target country
  const handleClickOnMap = (target) => {
    const detailData = jsonData.filter((e) => e.name.common === target);
    if (nameFilter != undefined) {
      setDataForDetailPage(detailData);
    } else {
      setNameFilter(target);
    }
  };

  const changeCountry = (e) => {
    const target = e.currentTarget.textContent;
    const detailData = jsonData.filter((e) => e.name.common === target);
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
    } else if (!myRef.current.contains(e.target)) {
      setNameFilter(undefined); //clear "detail page" state
    }
  };
  const handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      setNameFilter(undefined); //clear "detail page" state
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center align-middle ">
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

        <div className="flex flex-row justify-between w-full px-12 py-10 mx-auto max-w-7xl">
          {detailPageView ? (
            <>
              <div className="cursor-pointer">
                <CountriesTable
                  data={finalFilerToCardsGrid}
                  // set data for detailPage and open detailPage
                  setNameFilter={setNameFilter}
                  // setHoverCoordiantes={setHoverCoordiantes}
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="flex justify-center align-middle"
                ref={myRef}
                onClick={handleClickOutside}
              >
                <CountriesDetails
                  data={dataForDetailPage}
                  //to filter border countries
                  jsonData={jsonData}
                  backButton={resetDetailState}
                  changeCountry={changeCountry}
                  //for img page
                  nameFilter={nameFilter}
                />
              </div>
            </>
          )}

          <MapChart
            setTargetCountries={setTargetCountries}
            dataForDetailPage={dataForDetailPage}
            handleClickOnMap={handleClickOnMap}
            // hoverCoordinates={hoverCoordinates}
          />
          <Tooltip id="tooltip">{targetCountries}</Tooltip>
        </div>
      </div>
    </>
  );
}

export default CountriesGrid;
