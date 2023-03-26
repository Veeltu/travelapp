import UpperTab from './UpperTab'
import { Link } from 'react-router-dom';
import {createApi, Unsplash} from 'unsplash-js';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Images() {
    const [unsplashData, setUnsplashData]= useState(); 

    console.log(unsplashData)

    const unsplash = new Unsplash({
        applicationId: "lf8U9V07h_SeLEJ0OeuNA2o3NyWKjUZ0UjWL2jWJ26c",
        secret: "jyz8MwR6yBJmudvEM3YOnkyGbeaF-a7PxFlos9n8E_A"
      });



    //   useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const resp = await axios.get('https://api.unsplash.com/photos/?client_id=' + 'lf8U9V07h_SeLEJ0OeuNA2o3NyWKjUZ0UjWL2jWJ26c')
    //             setUnsplashData(resp)
    //         } catch (error) {
    //             console.log(error.data)
    //         }
    //     }
    //     getData();
    //   },[])

      // filter 10 with "location" from state ?
    
 

    return ( 
        <>
        <UpperTab/>
        <Link to="/">
            <button className='btn'>
                back
            </button>
        </Link>
        <h1>IMAGES</h1>
        
        </>
     );
}

export default Images;
