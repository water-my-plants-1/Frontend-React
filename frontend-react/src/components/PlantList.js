import React, { useState } from "react";
import axios from "axios";

import "../index.css";



const PlantList = () => {
    const [listState, setListState] =useState();

    axios
    .get("https://water-my-plants-backend-vw.herokuapp.com/user/plants", listState)
   
    .then(response => {
      console.log(response.data);
      //update display plants state
      // props.newPlant(response.data);
      // props.history.push("/PlantList");
    })
    .catch(err => console.log(err));


    return(
        <div>

        </div>
    );
};
export default PlantList;