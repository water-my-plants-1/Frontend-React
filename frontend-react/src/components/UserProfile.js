import React from "react";
import axios from "axios";

// get request to post info using https://reqres.in/api/users
// goal is to get the user information

const UserProfile = (props) => {
    const [info, setInfo] = useState([]);
    console.log(info);
  
    useEffect(() => {
      axios
        .get("https://water-my-plants-backend-vw.herokuapp.com/user")
        .then(res => 
            console.log(res);
            setInfo(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
      <div className="userDiv">
        <h1>User Information</h1>
        <div className="cardContainer">
            {props.user.map(user => (
                    <div key={user.id} className='matesCard'>
                        <p>username: {user.username}</p>
                        <p>password: {user.password}</p>
                        <p>phoneNumber: {user.phoneNumber}</p>
                    </div>
            )};
        </div>
      </div>
    );
};

           
export default UserProfile;
  