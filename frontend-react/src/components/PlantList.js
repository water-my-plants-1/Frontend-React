import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../Unit3-React-Folder/utils/axiosWithAuth';

import "../index.css";

const PlantList = () => {
    
    const [listState, setListState] =useState([]);

    const removePlant = plant => {
        setListState(listState.filter(item => item.nickname !== plant.nickname));
      };

    useEffect(() => {
        axiosWithAuth()
            .get("https://water-my-plants-backend-vw.herokuapp.com/user/plants")
        
            .then(response => {
                setListState(response.data);
        
        })
        .catch(err => console.log(err));
    }, [])


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
                                <h3>Please water : {plant.h2oFrequency}</h3>
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