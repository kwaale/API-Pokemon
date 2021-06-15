import React, { useEffect, useState } from 'react';
import Pokemon from './Pokemon';
// import { NavLink } from 'react-router-dom';

import { getPokemons_12 } from '../../store/actions/pokemonActions';
import { connect } from 'react-redux';


const Pokemons = ({ getPokemons_12, pokemons }) => {
    
    useEffect(() => {
        console.log('A dentro de useEffect')
        getPokemons_12()
    }, []);
    return (
        <div>
            <h1>Componente Pokemon</h1>
            {
                pokemons.map(pokemon => {
                    return (
                        <Pokemon
                            key={pokemon.name}
                            name={pokemon.name}
                            types={pokemon.types}
                            img={pokemon.img}
                        />
                    )
                })
            }
        </div>
        

    )
}
const mapStateToProps = state => {
    console.log('mapStateToProps state', state)
    return {
        pokemons: state.pokemons
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getPokemons_12: () => dispatch(getPokemons_12()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
