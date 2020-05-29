// import React, { useState, useEffect} from "react";
// import axios from "axios";

// import "../index.css";



// const PlantList = () => {

//     const plantData=[
//         { nickname: "rose", species: "rose", h2oFrequency: "1"},
//         { nickname: "lemon", species: "lemon", h2oFrequency: "2"}
//     ];
//     const [listState, setListState] =useState([]);
//     useEffect(() => {
//         axios
//         .get("https://reqres.in/api/users")
//         // .get("https://water-my-plants-backend-vw.herokuapp.com/user")
       
//         .then(response => {
//           console.log(response.data.data);
//         setListState(plantData);
//           //update display plants state
//           // props.newPlant(response.data);
//           // props.history.push("/PlantList");

          
//         })
//         .catch(err => console.log(err));
//     },[])


//     const removePlant = plant => {
//         console.log("test", plant.nickname);
//         console.log('list ', listState);
//         setListState(listState.filter(item => item.nickname !== plant.nickname));
//       };


//     return(
//         <div>
//             <h2>Your Plants</h2>
//             <div className="plantContainer">
//                 {/* {
//                     listState.map((plant, i) => {
//                         return(
//                             <div className="plant" key={i}>
//                                 <h3>Plant Name: {plant.nickname}</h3>
//                                 <h3>Plant Species: {plant.species}</h3>
//                                 <h3>Please water : {plant.h2oFrequency}</h3>
//                                 <button onClick={() => removePlant(plant)}>Remove Plant</button>
//                             </div>
//                         );
//                      })
//                 } */}

//                 {
//                     plantData.map((plant, i) => {
//                         return(
//                             <div className="plant" key={i}>
//                             <h3>Plant Name: {plant.nickname}</h3>
//                             <h3>Plant Species: {plant.species}</h3>
//                             <h3>Please water : {plant.h2oFrequency}</h3>
//                             <button onClick={() => removePlant(plant)}>Remove Plant</button>
//                         </div>
//                         );
//                     })
//                 }
//             </div>  
//         </div>
//     );
            
// };
// export default PlantList;



import React, {useState, useEffect} from "react";
import { axiosWithAuth } from "../Unit3-React-Folder/utils/axiosWithAuth";

const PlantList = (props) => {

        useEffect(() => {
        axiosWithAuth()
        .get("https://reqres.in/api/users")
        // .get("https://water-my-plants-backend-vw.herokuapp.com/user")
       
        .then(response => {
          console.log(response.data);
            // setListState(plantData);
            //update display plants state
            // props.newPlant(response.data);
            // props.history.push("/PlantList");

          
        })
        .catch(err => console.log(err));
    },[])
   
    return (
        <div>
          
            <h2>Your Plants</h2>
            {
                props.plantList.map((plant, i) => {
                   return(
                       <div className="plant" key={i}>
                           <h3>Plant Name: {plant.nickname}</h3>
                           <h3>Plant Species: {plant.species}</h3>
                           <h3>Please water : {plant.h2oFrequency}</h3>
                           <button onClick={() => props.removePlant(plant)}>Remove Plant</button>
                       </div>
                   );
                })
            }
        </div>
    );
};
export default PlantList;