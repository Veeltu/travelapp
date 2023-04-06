import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { useEffect, useState, memo } from "react";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { useSpring, animated } from "react-spring";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function MapChart({
  dataForDetailPage,
  setTargetCountries,
  handleClickOnMap,
  hoverData,
  hoverBorderData,
}) {
  const [apiMapData, setApiMapData] = useState([]);
  // state for zoom to target(detailPage) country
  const [targetCoordinates, setTargetCoordinates] = useState([]);
  // why I need cca3 ?
  const [cca3Name, setCca3Name] = useState("");
  //hover states
  const [hoverTableName, setHoverTableName] = useState("");
  const [hoverCoordinates, setHoverCoordinates] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get(geoUrl);
        setApiMapData(resp.data.objects);
      } catch (error) {
        console.log(error.data);
      }
    };
    getData();
  }, []);

  // hover stuff
  useEffect(() => {
    if (hoverData.length === 0) {
      setHoverTableName([]);
    } else {
      // set name of hover country
      const hoverName = hoverData.name.common;
      setHoverTableName(hoverName);

      // set coordiantes of hover country to zoom on hover
      // const hoverCoordinates = hoverData.latlng;
      // const reversCoordinates = hoverCoordinates.slice().reverse();
      // setHoverCoordinates(reversCoordinates);
    }
  }, [hoverData]);

  // getting coordinates (have to revers them to mach mapApi with countriesApi data)
  useEffect(() => {
    if (dataForDetailPage.length === 0) {
      setTargetCoordinates([]);
    } else {
      const coor = dataForDetailPage.map((e) => e.latlng);
      const coorRevers = coor[0].slice().reverse();
      setTargetCoordinates(coorRevers);
      // const cca3Data = dataForDetailPage.map((e) => e.cca3);
      // setCca3Name(cca3Data);
    }
  }, [dataForDetailPage]);

  // show name on map - Marker
  const nameOnMap = dataForDetailPage.map((e) => e.name.common);
  // take out string to fill target country from detail page
  const nameOnMapString = nameOnMap[0];

  

  return (
    <>
    <div className="h-[450px]">
      <ComposableMap
        className="w-full h-full shadow-xl cursor-pointer card bg-white/5 drop-shadow-xl "
        data-tooltip-id="tooltip"
        data-tooltip-float="true"
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 230,
        }}
      >
        <ZoomableGroup center={targetCoordinates} zoom={4}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, index) => {
                // fill country from detail page
                const isActive = geo.properties.name === nameOnMapString;
                const fillIsActive = isActive ? "fill-warning" : "";

                // fill hover on table country
                const isHover =
                  geo.properties.name === hoverTableName ||
                  geo.properties.name === hoverBorderData;
                const fillColor = isHover ? "fill-secondary" : "";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="hsl(var(--sc))" // css variable from daisyUI for work with themes
                    className={`${fillIsActive} 
                    ${fillColor} 
                    hover:fill-secondary outline-none `}
                    onMouseEnter={() => {
                      const name = geo.properties.name;
                      setTargetCountries(name);
                    }}
                    onMouseLeave={() => setTargetCountries("")}
                    onClick={() => {
                      const name = geo.properties.name;
                      handleClickOnMap(name);
                    }}
                  />
                );
              })
            }
          </Geographies>
          <Marker coordinates={targetCoordinates}>
            <text
              textAnchor="middle"
              className="font-bold fill-info text-sm"
              style={{ fontSize: "9px" }}
            >
              {nameOnMap}
            </text>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
      </div>
    </>
  );
}

export default memo(MapChart);
