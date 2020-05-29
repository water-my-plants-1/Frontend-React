const initialState = 
    {
    // nickname: '',
    // species: '',
    // h2oFrequency: 0,
    plants: [],
    isFetching: false,
    error:''
    };


export const reducer = (state = initialState, action) => {
    switch(action.type) {
            case 'FETCH_PLANTS':
                return {
                    ...state,
                    isFetching: true
                };
            case 'FETCH_PLANTS_SUCCESS':
                return {
                    ...state,
                    isFetching: false,
                    plants: action.payload,
                    error:''
                }
            case 'FETCH_PLANTS_FAILED':
                return {
                    ...state,
                    error: action.payload
                }

                default:
                   return state;        
    }
}