import React from "react";

const PlantList = (props) => {
    // <h2>Your Plants</h2>
    return (
        <div>
            {/* {JSON.stringify(props.plantList)} */}
            {
                props.plantList.map((plant, i) => {
                   return(
                       <div className="plant" key={i}>
                           <h3>Plant Name: {plant.plantName}</h3>
                           <h3>Plant Species: {plant.plantSpecies}</h3>
                           <h3>Please water : {plant.wateringSchedule}</h3>
                       </div>
                   );
                })
            }
        </div>
    );
};

export default PlantList;