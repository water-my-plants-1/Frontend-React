import React, { useState } from "react";
import axios from "axios";

import "../index.css";



const PlantList = () => {
    const [listState, setListState] =useState([]);

    axios
    .get("https://water-my-plants-backend-vw.herokuapp.com/user/plants")
   
    .then(response => {
      console.log(response.data);
      setListState(response.data);
      //update display plants state
      // props.newPlant(response.data);
      // props.history.push("/PlantList");
      
    })
    .catch(err => console.log(err));

    const removePlant = plant => {
        setListState(listState.filter(item => item.nickname !== plant.nickname));
      };


    return(
        <div>
            <h2>Your Plants</h2>
            <div className="plantContainer">
                {
                    listState.map((plant, i) => {
                        return(
                            <div className="plant" key={i}>
                                <h3>Plant Name: {plant.nickname}</h3>
                                <h3>Plant Species: {plant.species}</h3>
                                <h3>Please water : {plant.H2oFrequency}</h3>
                                <button onClick={() => removePlant(plant)}>Remove Plant</button>
                            </div>
                        );
                     })
                }
            </div>  
        </div>
    );
            
};
export default PlantList;