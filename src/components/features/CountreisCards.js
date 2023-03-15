const CountriesCard = ({ data, setNameFilter }) => {
  const handleDetailsClick = (e) => {
    const a = e.currentTarget.dataset.id;
    setNameFilter(a);
  };
  return (
    <>
      <div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>flag</th>
              <th>name</th>
              <th>population</th>
              <th>region</th>
              <th>capital</th>
            </tr>
          </thead>

          <tbody>
            {data.map((e) => (
              <tr
                onClick={(e) => handleDetailsClick(e)}
                key={e.name.common}
                data-id={e.name.common}
              >
                <td className="w-20">
                  <div className="w-12 h-12 mask mask-squircle">
                    <img className="" alt="flag" src={e.flags.png}></img>
                  </div>
                </td>
                <td>
                  <div className="text-lg font-bold ">
                    <h2>{e.name.common}</h2>
                  </div>
                </td>
                <td>
                  <div className="font-bold ">{e.population}</div>
                </td>
                <td>
                  <div className="font-bold"> {e.region}</div>
                </td>
                <td>
                  <div className="font-bold"> {e.capital}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CountriesCard;
