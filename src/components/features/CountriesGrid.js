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
  const [filterResult, setFilterResult] = useState([]);
  // name of coutry use to filter from big data
  const [nameFilter, setNameFilter] = useState();
  // array for detailPage
  const [dataForDetailPage, setDataForDetailPage] = useState([]);
  // show/ hide detailPage
  const [detailPageView, setDetailPageView] = useState(false);
  // state for tooltip
  const [targetCountries, setTargetCountries] = useState("");
  // coordinates for hover on table
  const [hoverData, setHoverData] = useState([]);
  // console.log(hoverData);
  const [hoverBorderData, setHoverBorderData] = useState([]);
  // console.log(hoverBorderData)

  //fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get(url + "all");
        setJsonData(resp.data);
        setFilterResult(resp.data);
      } catch (error) {
        console.log(error.data);
      }
    };
    getData();
  }, []);

  //set data for detailPage and toggle detailPage
  useEffect(() => {
    const detailData = jsonData.filter((e) => e.name.common === nameFilter);
    setDataForDetailPage(detailData);
    toggle();
  }, [nameFilter]);

  // difrences in country names in api-s, index is important !
  const mapNameDifrences = [
    "United States of America",
    "Democratic Republic of the Congo",
  ];
  const restCountriesDifrence = ["United States", "Republic of the Congo"];

  //function => click on map show detail page of target countr
  const handleClickOnMap = (target) => {
    // check if target is in mapNameDifrences
    if (mapNameDifrences.includes(target)) {
      // get the corresponding index of the target in mapNameDifrences
      const targetIndex = mapNameDifrences.indexOf(target);
      // update target to the corresponding country in restCountriesDifrence
      target = restCountriesDifrence[targetIndex];
    }
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
    setHoverBorderData("");
  };
  //filterByContinent
  useEffect(() => {
    let result = jsonData;
    if (filterByContinent !== "All")
      result = result.filter((e) => e.region === filterByContinent);
    setFilterResult(result);
    // setContinentZoomCoordinates() ?
  }, [filterByContinent]);
  //name filter
  useEffect(() => {
    const filteredData = jsonData.filter((e) => {
      return e.name.common.toLowerCase().includes(inputTextToFilter);
    });
    setFilterResult(filteredData);
  }, [inputTextToFilter]);

  const toggle = () => setDetailPageView((wasOpened) => !wasOpened);
  const resetDetailState = () => setNameFilter(undefined);

  //close details => outside click and ESC
  const myRef = useRef();

  //outside click close function
  // const handleClickOutside = (e) => {
  //   if (myRef.current === null) {
  //   } else if (!myRef.current.contains(e.target)) {
  //     setNameFilter(undefined); //clear "detail page" state
  //   }
  // };

  const handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      setNameFilter(undefined); //clear "detail page" state
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);
    // document.addEventListener("mousedown", handleClickOutside);
    // return () => document.removeEventListener("mousedown", handleClickOutside);
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
                  data={filterResult}
                  // set data for detailPage and open detailPage
                  setNameFilter={setNameFilter}
                  setHoverData={setHoverData}
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="flex justify-center align-middle"
                ref={myRef}
                // onClick={handleClickOutside}
              >
                <CountriesDetails
                  data={dataForDetailPage}
                  //to filter border countries
                  jsonData={jsonData}
                  backButton={resetDetailState}
                  changeCountry={changeCountry}
                  //for img page
                  nameFilter={nameFilter}
                  setHoverBorderData={setHoverBorderData}
                />
              </div>
            </>
          )}
          <MapChart
            setTargetCountries={setTargetCountries}
            dataForDetailPage={dataForDetailPage}
            handleClickOnMap={handleClickOnMap}
            hoverData={hoverData}
            hoverBorderData={hoverBorderData}
          />
          <Tooltip id="tooltip">{targetCountries}</Tooltip>
        </div>
      </div>
    </>
  );
}

export default CountriesGrid;
