import axios from "axios";
import { useState, useEffect, useRef } from "react";
import CountriesTable from "./table/CountreisTable";
import FilterByName from "../filters/FilterByName";
import FilterByContinent from "../filters/FilterByContinent";
import CountriesDetails from "./detailsPage/CountriesDetails";
import MapChart from "./map/Map";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { checkDifrences } from "../utils/checkDifrences";

const url = "https://restcountries.com/v3.1/";

function BodyView() {
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
    if (detailPageViewShow === false) {
      setDetailPageViewShow(true);
    }
  };

  const handleClickOnMap = (nameCountry) => {
    const country = checkDifrences(nameCountry);
    filterName(country);
  };

  const changeCountry = (e) => {
    const target = e.currentTarget.textContent;
    const detailData = jsonData.filter((e) => e.name.common === target);
    setDataForDetailPage(detailData);
    setHoverBorderData("");
  };

  const resetDetailState = () => {
    setDataForDetailPage([]);
    setDetailPageViewShow(false);
  };

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
      <div className="body p-10 flex flex-col justify-center align-middle max-w-7xl ">

        <div className=" flex flex-col justify-center md:flex-row w-full gap-10 max-w-7xl">
          <div className="w-full md:w-3/5 ">
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
                className="md:max-w-sm"
                ref={myRef}
                // onClick={handleClickOutside}
              >
                <CountriesDetails
                  data={dataForDetailPage}
                  //to filter border countries
                  jsonData={jsonData}
                  backButton={resetDetailState}
                  changeCountry={changeCountry}
                  setHoverBorderData={setHoverBorderData}
                />
              </div>
            </>
          ) : (
            <>
              <div className=" flex flex-col gap-2 justify-center cursor-pointer">
                <FilterByContinent
                  jsonData={jsonData}
                  setFilterResult={setFilterResult}
                />
                <FilterByName
                  jsonData={jsonData}
                  setFilterResults={setFilterResult}
                />
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

export default BodyView;
