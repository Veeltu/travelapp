import UpperTab from "../../UpperTab";
import { Link } from "react-router-dom";
import { createApi, Unsplash } from "unsplash-js";
import axios from "axios";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

function Images() {
  const [unsplashData, setUnsplashData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const locationData = useLocation();
  const data = locationData.state; // const for search unsplash
  const name = data.map((el) => el.name.common);

  const accessKey = "lf8U9V07h_SeLEJ0OeuNA2o3NyWKjUZ0UjWL2jWJ26c";

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get(
          `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${name}&client_id=${accessKey}&per_page=9`
        );
        // console.log(resp);
        setUnsplashData(resp.data.results);
      } catch (error) {
        console.log(error.data);
      }
    };
    getData();
  }, [pageNumber]);

  return (
    <div className="gap-10  flex flex-col justify-center px-20">
      <UpperTab />
      <Link to="/">
        <button className="btn">back</button>
      </Link>

      <div className="container mx-auto lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
        {unsplashData.map((e) => (
          <div className="card bg-base-100 h-48 shadow-xl rounded-lg max-w-sm ">
            <figure>
              <img className="" alt="img" src={e.urls.small} key={e.id}></img>
            </figure>
          </div>
        ))}
      </div>
      <div className="btn-group flex justify-center m-10">
        <div className="btn-group grid grid-cols-2">
          <button
            className="btn btn-outline"
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous page
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Images;
