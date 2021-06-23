// import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getTypes } from '../../store/actions/pokemonActions';
import { NavLink } from 'react-router-dom'


import React from 'react';


const Types = ({ getTypes, types }) => {
    useEffect(() => {
        getTypes()
    }, [])
    console.log(types)
    return (
        <div>
            {
                types.map(type => {
                    return (
                        <NavLink to={`pokemons/types/${type}`}>
                            <li><button>{type}</button></li>
                            </NavLink>
                    )
                })
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        ...state,
        types: state.types
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getTypes: () => dispatch(getTypes()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Types);