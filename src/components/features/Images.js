import UpperTab from "./UpperTab";
import { Link } from "react-router-dom";
import { createApi, Unsplash } from "unsplash-js";
import axios from "axios";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

function Images() {
  const [unsplashData, setUnsplashData] = useState([]);
  console.log(unsplashData);

  const data = useLocation();
  const name = data.state; // const for search unsplash
  console.log(name);
  const accessKey = "lf8U9V07h_SeLEJ0OeuNA2o3NyWKjUZ0UjWL2jWJ26c";

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=${accessKey}`,
          {
            params: {
              _limit: 10,
            },
          }
        );
        // console.log(resp);
        setUnsplashData(resp.data.results);
      } catch (error) {
        console.log(error.data);
      }
    };
    getData();
  }, []);

  return (
    <>
      <UpperTab />
      <Link to="/">
        <button className="btn">back</button>
      </Link>

      <h1>IMAGES</h1>

          <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">

          {unsplashData.map((e) => (
            <div className="rounded ">
              <img  className="object-cover h-48 w-96" src={e.urls.small} key={e.id}></img>
              </div>
          ))}

          </div>
    </>
  );
}

export default Images;
