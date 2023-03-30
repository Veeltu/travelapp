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
import { Tooltip } from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
console.log(geoUrl);

function MapChart({
  dataForDetailPage,
  setTargetCountries,
  handleClickOnMap,
  // hoverCoordinates,
}) {
  // state for zoom to target(detailPage) country
  const [targetCoordinates, setTargetCoordinates] = useState([]);
  // why I need cca3 ?
  const [cca3Name, setCca3Name] = useState("");

  // getting coordinates (have to revers them to mach mapApi with countriesApi data)
  useEffect(() => {
    if (dataForDetailPage.length === 0) {
      setTargetCoordinates([]);
    } else {
      const coor = dataForDetailPage.map((e) => e.latlng);
      const coorRevers = coor[0].slice().reverse();
      setTargetCoordinates(coorRevers);
      const cca3Data = dataForDetailPage.map((e) => e.cca3);
      setCca3Name(cca3Data);
    }
  }, [dataForDetailPage]);

  const nameOnMap = dataForDetailPage.map((e) => e.name.common);

  return (
    <>
      <ComposableMap
        className="w-full h-full shadow-xl cursor-pointer card bg-white/5 drop-shadow-xl "
        data-tooltip-id="tooltip"
        data-tooltip-float="true"
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 200,
        }}
      >
        // hoverCoordinates ?
        <ZoomableGroup center={targetCoordinates} zoom={4}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className={
                    "hover:fill-accent active:fill-warning focus:fill-warning   fill-slate-100  outline-none"
                  }
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
              ))
            }
          </Geographies>
          <Marker coordinates={targetCoordinates}>
            <text textAnchor="middle" className="font-bold fill-accent ">
              {nameOnMap}
            </text>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}
export default memo(MapChart);
{
  /* <Annotation
  subject={[2.3522, 48.8566]}
  dx={-90}
  dy={-30}
  connectorProps={{
    stroke: "#FF5533",
    strokeWidth: 1,
    strokeLinecap: "round"
  }}
>
  <text x="-4" textAnchor="end" alignmentBaseline="middle" fill="#F53">
    {"Paris"}
  </text>
</Annotation> */
}
