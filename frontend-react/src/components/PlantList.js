import React, {useState} from "react";

const PlantList = (props) => {
    return (
        <div>

            {
                props.plantList.map((plant, i) => {
                   return(
                       <div className="plant" key={i}>
                           <h3>Plant Name: {plant.plantName}</h3>
                           <h3>Plant Species: {plant.plantSpecies}</h3>
                           <h3>Please water : {plant.wateringSchedule}</h3>
                           <button onClick={() => props.removePlant(plant)}>Remove Plant</button>
                       </div>
                   );
                })
            }
        </div>
    );
};

export default PlantList;