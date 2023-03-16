import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function MapChart() {
  return (
    <ComposableMap className="artboard artboard-horizontal phone-2 bg-White/5 drop-shadow-xl"
    projection="geoAzimuthalEqualArea"
    projectionConfig={{
      scale: 400
    }}>
        
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
            
              style={{
                default: {
                  fill: "	#87CEFA",
                },
                hover: {
                //   fill: "#4169E1",
                  fill: "#FF5533"
                },
                // active: {
                //   fill: "#FF5733",
                // },
              }}

              // fill="#FF5533"
              //   stroke="#000000"
            />
          ))
        }
      </Geographies>
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
