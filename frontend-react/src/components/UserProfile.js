import React, { useState, useEffect } from 'react';
import axios from 'axios';


// const UserProfile = (props) => {
//     const [user, setUser] = useState([ {key: "value"} ]);
    
//     useEffect(() => {
//         axios
//           .get("https://reqres.in/api/users")
//           .then(res => {
//               console.log(res.data)
//               setUser(res.data)
//             }
//           )
//           .catch(err => console.log(err));
//           console.log("this is user from API", user);
//     }, [])

//     if (user) {
//           return (
//               <div className="userDiv">
//                 <h1>User Information</h1>
//                   <div className="cardContainer">
//                     {
//                       [user].map(user => ( 
//                                 <div key={user.id} className='infoCard'>
//                                     <p>username: {user.email}</p>
//                                     <p>first name: {user.first_name}</p>
//                                     <p>last name: {user.last_name}</p>
//                                 </div>
//                         )
//                       )
//                     }
//                   </div>  
//               </div>
//           );
          
//      } else { return (<div>Loading...</div>)};
// }

// export default UserProfile;
           


const UserProfile = (props) => {
  const [user, setUser] = useState([ {key: "value"} ]);
  
  useEffect(() => {
      axios
        .get("https://water-my-plants-backend-vw.herokuapp.com/user")
        .then(res => {
            console.log(res.data)
            setUser(res.data)
          }
        )
        .catch(err => console.log(err));
        console.log("this is user from API", user);
  }, [])

  if (user) {
        return (
            <div className="userDiv">
              <h1>User Profile Information</h1>
                <div className="cardContainer">
                  {
                    [user].map(user => ( 
                              <div key={user.id} className='infoCard'>
                                  <p>Username: {user.username}</p>
                                  <p>Phone number: {user.phoneNumber}</p>
                              </div>
                      )
                    )
                  }
                </div>  
            </div>
        );
        
   } else { return (<div>Loading...</div>)};
}

export default UserProfile;



// export default class UserProfile extends React.Component {
  
//   componentDidMount() {
//     axios.get(`https://water-my-plants-backend-vw.herokuapp.com/user`)
//       .then(res => {
//         console.log(res);
//         const persons = res.data;
//         this.setState({ persons });
//       })
//   }

//   render() {

//     return (
//       <div>
//         this.state.persons.map(person => {
//               return (
//                 <li>{person.username}</li>
//                 <li>{person.phoneNumber}</li>
//               )
//       </div>

//     );
//   }



/* //     return (
//       <div>
//         this.state.persons.map(person => {
//               return (
//                 <li>{person.username}</li>
//                 <li>{person.phoneNumber}</li>
//               )} 
          
//         }
//       </div>
//     );
// } */
      




// export default UserProfile;
  

// if backend link doesnt work then get request to post info using https://reqres.in/api/users
// goal is to get the user information to display




