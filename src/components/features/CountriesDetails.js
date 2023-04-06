import { Link } from "react-router-dom";

function CountriesDetails({
  data,
  jsonData,
  backButton,
  changeCountry,
  nameFilter,
  setHoverBorderData,
}) {
  const borderCountries = (e) => {
    const findCountry = jsonData.filter((item) => e.includes(item.cca3));
    const countryNames = findCountry.map((e) => e.name.common);
    return countryNames;
  };

  return (
    <div className="card min-h-[600px] bg-primary text-primary-content flex flex-col space-x-4">
      <main className=" w-full">
        <button className="btn m-5" onClick={backButton}>
          GET BACK
        </button>
        <div className="">
          {data.map((e) => (
            <div
              key={e.name.common}
              data-id={e.name.common}
              className="flex flex-col mx-auto lg:gap-5 px-5 lg:grid-cols-2 lg:justify-between lg:text-left"
            >
              <div className="avatar">
                <div className="w-24 rounded">
                  <img className="mb-5 mt-5" alt="flag" src={e.flags.png}></img>
                </div>
              </div>
              <div className=" grid lg:grid-cols-2 grid-rows-[2.6em] gap-x-5">
                <div className="flex items-center gap-2 mb-4 text-lg font-bold sm:text-2xl lg:mb-5 sm:col-span-2 sm:gap-3">
                  <h2>{e.name.common}</h2>
                </div>
                {/*column1 */}
                <div className="mb-5 column1 lg:mb-0">
                  <div className="nativname">
                    <span className="font-semibold">Native Name: </span>
                    {
                      e.name.nativeName[Object.keys(e.name.nativeName)[0]]
                        .common
                    }
                  </div>
                  <div className="population">
                    <span className="font-semibold"> Population:</span>{" "}
                    {e.population}
                  </div>
                  <div className="region">
                    <span className="font-semibold"> Region:</span> {e.region}
                  </div>
                  <div className="subregion">
                    <span className="font-semibold"> Sub Region: </span>
                    {e.subregion}
                  </div>
                  <div className="capital">
                    <span className="font-semibold"> Capital: </span>
                    {e.capital}
                  </div>
                </div>
                {/*column2 */}
                <div className="mb-5 column2 lg:mb-0">
                  <div className="topLevelDomain">
                    <span className="font-semibold">Top Level Domain: </span>
                    {e.tld ? e.tld[0] : "none"}
                  </div>
                  <div className="curencies">
                    <span className="font-semibold">Curencies: </span>
                    {e.currencies
                      ? e.currencies[Object.keys(e.currencies)[0]].name
                      : []}
                  </div>
                  <div className="languages">
                    <span className="font-semibold">Languages: </span>
                    {e.languages ? Object.values(e.languages).join(", ") : ""}
                  </div>
                </div>
                <div className=" sm:col-span-2 sm:mt-2">
                  <Link to="/images" state={nameFilter}>
                    <button className="btn btn-wide btn-large btn-secondary my-5">
                      images
                    </button>
                  </Link>
                  <div>
                    <span className="font-semibold"> Border countries: </span>
                    <div className="flex flex-wrap gap-2 py-5">
                      {e.borders
                        ? e.borders.map((e) => (
                            <ul
                              key={e}
                              className="btn"
                              onClick={(e) => changeCountry(e)}
                              onMouseEnter={() =>
                                setHoverBorderData(borderCountries(e)[0])
                              }
                              onMouseLeave={() => setHoverBorderData("")}
                            >
                              {borderCountries(e)}
                            </ul>
                          ))
                        : "none"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <Link to="/images" state={nameFilter}>
          <button className="btn btn-wide btn-large btn-secondary">images</button>
        </Link> */}
      </main>
    </div>
  );
}

export default CountriesDetails;
