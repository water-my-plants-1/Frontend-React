import { axiosWithAuth } from '../utils/axiosWithAuth';

export const FETCH_PLANTS = 'FETCH_PLANTS';
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS';
export const FETCH_PLANTS_FAILED = 'FETCH_PLANTS_FAILED';

export const fetchPlants = props => dispatch => {
    // ASYNC OPERATIONS
    dispatch({ type: FETCH_PLANTS });
    axiosWithAuth()
        .post('https://water-my-plants-backend-vw.herokuapp.com/plants/', props)
        .then(res => {
            dispatch({ type: FETCH_PLANTS_SUCCESS, payload: props })
        })
        .catch(err => {
            dispatch ({ type: FETCH_PLANTS_FAILED, payload: err.response })
        })
};
