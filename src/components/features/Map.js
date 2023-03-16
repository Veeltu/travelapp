import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import { useEffect, useState } from "react";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapChart() {
const [targetCoordinates, setTargetCoordinates] = useState([]);

// setTargetCoordinates([0,0])
  return (
    <ComposableMap
      className="w-1/2 shadow-xl h-1/2 card bg-white/5 drop-shadow-xl"
      projection="geoEqualEarth"
      projectionConfig={{
        scale: 200,
      }}
    >
      <ZoomableGroup center={targetCoordinates} zoom={9} >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className={
                  " drop-shadow-xl  hover:fill-accent active:fill-warning focus:fill-warning   fill-slate-100  outline-none"
                }
                // fill="#FF5533"
                // stroke="#4169E1"
              />
            ))
          }
        </Geographies>
        <Marker coordinates={targetCoordinates}>
            <circle r={1} fill="#FF5533" />
          </Marker>
      </ZoomableGroup>
      {/* <Annotation
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
      </Annotation> */}
    </ComposableMap>
  );
}