import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../Unit3-React-Folder/utils/axiosWithAuth';

import "../index.css";

const PlantList = () => {
    
    const [listState, setListState] =useState([]);

    const removePlant = plant => {
        
        axiosWithAuth()
        .delete(`https://water-my-plants-backend-vw.herokuapp.com/user/${plant.id}`)
        .then(response => {
            console.log('res ', response);
            setListState(listState.filter(item => item.nickname !== plant.nickname));
        })
      };

    useEffect(() => {
        axiosWithAuth()
            .get("https://water-my-plants-backend-vw.herokuapp.com/user/plants")
        
            .then(response => {
                setListState(response.data);
        console.log('list ', response.data);
        })
        .catch(err => console.log(err));
    }, [])


    return(
        <div className="plantList">
          
            <h2>Your Plants</h2>
            <div className="plantContainer">
                {
                    listState.map((plant, i) => {
                        return(
                            <div className="plant" key={i}>
                                <h4>My name is {plant.nickname}</h4>
                                <h4>Plant Species: {plant.species}</h4>
                                <h4>Please water me {plant.h2oFrequency} a day.</h4>
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