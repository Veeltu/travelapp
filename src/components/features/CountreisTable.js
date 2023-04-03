const CountriesTable = ({ data, setNameFilter, setHoverData }) => {
  const hangleTableClick = (e) => {
    const a = e.currentTarget.dataset.id;
    setHoverData("")
    setNameFilter(a);
  };

  return (
    <>
      <div className=" bg-VeryLightGray box-sizing: content-box">
        <table className="table w-full h-40 text-xs">
          <thead>
            <tr>
              <th>flag</th>
              <th>country name</th>
              <th>region</th>
              {/* <th>subregion</th> */}
              {/* <th>capital</th> */}
            </tr>
          </thead>

          <tbody>
            {data.map((e) => (
              <tr
                className="hover"
                onClick={(e) => hangleTableClick(e)}
                // hoverData
                onMouseEnter={() => setHoverData(e)}
                onMouseLeave={() => setHoverData("")}
                key={e.name.common}
                data-id={e.name.common}
              >
                <td className="">
                  <div className="w-8 h-8 mask mask-squircle">
                    <img className="" alt="flag" src={e.flags.png}></img>
                  </div>
                </td>
                <td>
                  <div className="font-bold ">
                    <h2>{e.name.common}</h2>
                  </div>
                </td>
                <td>
                  <div className="font-bold ">{e.region}</div>
                </td>
                {/* <td>
                  <div className="font-bold"> {e.subregion}</div>
                </td> */}
                {/* <td>
                  <div className="font-bold"> {e.capital}</div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CountriesTable;
