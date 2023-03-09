import { useState, useEffect } from "react";
import axios from "axios";

function InputPlacesApi() {
  const [inputText , setInputText] = useState("");
  const [respData, setRespData] = useState("")
  //Text input value hot to get ?
  const myApi ="AIzaSyAqc7m7KXrGfOOZg21ek_9f_9KJMSsWzDA"
//   src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap">


  // useEffect(() => {
  //     const getData = async () => {
  //         try {
  //             // const resp = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&types=(cities)&key=${myApi}`)
  //             // const resp = await axios.get(`https://maps.googleapis.com/maps/api/js?key=${myApi}&libraries=places&callback=${inputText}`)
              
  //             setRespData(resp);
  //         } catch (error){
  //             console.log(error.data)
  //         }
  //     } 
  //     getData();
  // }, [inputText])

    return ( 
        <form>
         <input
          value={inputText}
          className="block w-full py-2 pr-3 bg-white border-none rounded-md shadow-xl placeholder:italic placeholder:text-slate-400 pl-9 focus:outline-none sm:text-sm"
          placeholder="Search for a country..."
          name="search"
          id="id"
          type="text"
          onChange={(e) => setInputText(e.target.value.toLowerCase())}
        />
      </form>
     );
}

export default InputPlacesApi;