import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPlants } from '../actions/plantActions';
import Loader from 'react-loader-spinner';

const Plants = props => {
    useEffect(() => {
        props.fetchPlants();
    }, [])

    return (
        <div>
            <h1>Plants Plants Plants!</h1>
            {props.isFetching && (
                <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                />
            )}
            <h3>{props.nickname}</h3>
            <h3>{props.species}</h3>
            <h3>{props.h2oFrequency}</h3>
            <p>{props.error}</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        nickname: state.reducer.nickname,
        species: state.reducer.species,
        h2oFrequency: state.reducer.h2oFrequency,
        isFetching: state.reducer.isFetching,
        error: state.reducer.error
    };
};

export default connect(
    mapStateToProps,
    { fetchPlants }
    )(Plants);