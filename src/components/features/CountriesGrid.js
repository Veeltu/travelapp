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
import { checkDifrences } from "./checkDifrences";

const url = "https://restcountries.com/v3.1/";

function CountriesGrid() {
  const [jsonData, setJsonData] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  // name of coutry use to filter from big data
  const [nameFilter, setNameFilter] = useState();
  // array for detailPage
  const [dataForDetailPage, setDataForDetailPage] = useState([]);
  // show/ hide detailPage
  const [detailPageViewShow, setDetailPageViewShow] = useState(false);
  // state for tooltip
  const [tooltipCountry, setTooltipCountry] = useState("");
  // coordinates for hover on table to pass for ract-simple-map
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

  const filterName = (nameCountry) => {
  const countryData = jsonData.filter((e) => e.name.common === nameCountry);
  setDataForDetailPage(countryData);
  if (detailPageViewShow === false) {setDetailPageViewShow(true)}
  }

const handleClickOnMap = (nameCountry) => {
  const country = checkDifrences(nameCountry)
  filterName(country)
}
  
  const changeCountry = (e) => {
    const target = e.currentTarget.textContent;
    const detailData = jsonData.filter((e) => e.name.common === target);
    setDataForDetailPage(detailData);
    setHoverBorderData("");
  };

  const resetDetailState = () => {
    setDataForDetailPage([])
    setDetailPageViewShow(false)
  }

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
      <div className="body flex flex-col justify-center align-middle max-w-7xl ">
        <div className="flex flex-col items-center justify-between w-full px-4 py-6 mx-auto h-9 sm:flex-row max-w-7xl">
          <FilterByName
            jsonData={jsonData}
            setFilterResults={setFilterResult}
          />
          <FilterByContinent
            jsonData={jsonData}
            setFilterResult={setFilterResult}
          />
        </div>
        <div className=" grid grid-cols-12 w-full max-w-7xl">
          <div className="col-span-8 px-10" >

          <MapChart
            setTooltipCountry={setTooltipCountry}
            dataForDetailPage={dataForDetailPage}
            handleClickOnMap={handleClickOnMap}
            hoverData={hoverData}
            hoverBorderData={hoverBorderData}
            />
            </div>
          {detailPageViewShow ? (
              <>
              <div
                className="col-span-4"
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
                  // nameFilter={nameFilter}
                  setHoverBorderData={setHoverBorderData}
                />
              </div>
            </>
          ) : (
            <>
            <div className="cursor-pointer col-span-4">
              <CountriesTable
                data={filterResult}
                // set data for detailPage and open detailPage
                setNameFilter={filterName}
                setHoverData={setHoverData}
              />
            </div>
          </>
          )}
          <Tooltip id="tooltip">{tooltipCountry}</Tooltip>
        </div>
      </div>
    </>
  );
}

export default CountriesGrid;
