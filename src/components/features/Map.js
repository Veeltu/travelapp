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

export default function MapChart({dataForDetailPage}) {


const [targetCoordinates, setTargetCoordinates] = useState([]);
const [targetCountries, setTargetCountries] = useState("")
const [cca3Name, setCca3Name] =useState("")

// console.log(targetCountries)
// console.log(cca3Name)
// consol  e.log(targetCountries)


useEffect(() => {
  if (dataForDetailPage.length === 0) {
  setTargetCoordinates([])
}
  else {
    const coor = dataForDetailPage.map((e) => e.latlng)
    const coorRevers = coor[0].slice().reverse();
    setTargetCoordinates(coorRevers)
    const cca3Data = dataForDetailPage.map((e) => e.cca3)
    setCca3Name(cca3Data)
  }

},[dataForDetailPage])

  return (
    <>
  
    <ComposableMap
      className="w-full h-full shadow-xl tooltip tooltip-top card bg-white/5 drop-shadow-xl"
      projection="geoEqualEarth"
      projectionConfig={{
        scale: 200,
      }}
    >
      <ZoomableGroup center={targetCoordinates} zoom={3} >

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
                // console.log(geo.properties)
                const name = geo.properties.name;
                setTargetCountries(name)
              }}
              onMouseLeave={() => setTargetCountries("")}
              />
            ))
          }
        </Geographies>

        <Marker coordinates={targetCoordinates}
         >
            <circle r={4} fill="#FF5533" />
            {/* <text textAnchor="middle" fill="#777">{cca3Name}</text> */}
          </Marker>

      </ZoomableGroup>
    </ComposableMap>

    {/* </div> */}
    </>
  );
}

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