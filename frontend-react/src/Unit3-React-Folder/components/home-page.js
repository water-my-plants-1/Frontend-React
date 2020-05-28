import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'



const HomePage = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://water-my-plants-backend-vw.herokuapp.com/user/plants`)
            .then(res => { 
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [loading])

    const handleDelete = e => {
        setLoading(true);
        e.preventDefault();
        axios
            .delete(
                `https://water-my-plants-backend-vw.herokuapp.com/user/plants/${e.target.value}`
                )
                .then(res => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err)
                });
    }

    if (!Array.isArray(data) || !data.length) {
        return (
            <div>
                <h1>My Plants</h1>
                <div>
                    <p>
                        Add a plant <Link to='/PlantForm'>here</Link>
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div>
            <h1>My Plants</h1>
            {data.map(plant => {
                return (
                    <div>
                        value={plant.id}
                        key={plant.id}
                        name={plant.plant_name}
                        species={plant.plant_species}
                        schedule={plant.water_schedule}
                        handleDelete={handleDelete}
                    </div>
                )
            })}
        </div>
    )
}

export default HomePage;