import { axiosWithAuth } from '../utils/axiosWithAuth';

export const FETCH_PLANTS = 'FETCH_PLANTS';
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS';
export const FETCH_PLANTS_FAILED = 'FETCH_PLANTS_FAILED';

export const fetchPlants = () => dispatch => {
    // ASYNC OPERATIONS
    dispatch({ type: FETCH_PLANTS });
    axiosWithAuth()
        .get('https://water-my-plants-backend-vw.herokuapp.com/user/plants/')
        .then(res => {
            console.log(res);
            dispatch({ type: FETCH_PLANTS_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch ({ type: FETCH_PLANTS_FAILED, payload: err.response })
        })
};
