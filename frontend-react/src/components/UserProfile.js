// get request to post info using https://reqres.in/api/users

axios.get('https://water-my-plants-backend-vw.herokuapp.com//users')
  .then( response => {
    console.log(response);
    const data = response.data;
    // const cardDiv = document.querySelector('.cards');
    // cardDiv.appendChild(createMyCard(data));
  })
  .catch( err => {
    console.log("Error: ", err);
  })

