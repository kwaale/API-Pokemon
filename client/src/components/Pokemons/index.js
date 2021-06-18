import React, { useEffect, useState } from 'react';
import Pokemon from './Pokemon';
// import { NavLink } from 'react-router-dom';

import { getPokemons_12 } from '../../store/actions/pokemonActions';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';


const Pokemons = ({ getPokemons_12, pokemons }) => {
    const location = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(location.search);
    const skip = parseInt(query.get('skip')) || 0;
    const limit = parseInt(query.get('limit')) || 12;

    useEffect(() => {
        console.log('A dentro de useEffect')
        // getPokemons_12()
    }, []);
    const handlePevious = () =>{
        if(skip > 0){
            query.set('skip', skip - limit);
        query.set('limit', limit);
            history.push({search: query.toString()})
        }
    }
    const handleNext = () =>{
        query.set('skip', skip + limit);
        query.set('limit', limit);
        history.push({search: query.toString()})
    }
    const handleChange = (e)=>{
        query.set('ORD', e.target.value);
        history.push({search: query.toString()})
    }
   
    return (
        <div>
            <h4>Ordena Pokemones</h4>
                <select name='types' onChange={handleChange}>
                    <option value='asda'>Ascendente Alfabeticamente</option>
                    <option value='desa'>Descendente Alfabeticamente</option>
                    <option value='asdf'>Ascendente por Fuerza</option>
                    <option value='desf'>Descendente por Fuerza</option>
                </select>
    
            {
                pokemons.length === 0 ? <h2>Cargando pokemons...</h2> : pokemons.map(pokemon => {
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
            <button onClick={handlePevious}>Pevious</button>
            <button onClick={handleNext}>Next</button>

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
