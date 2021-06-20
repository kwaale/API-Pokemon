import React, { useEffect, useState } from 'react';
import Pokemon from './Pokemon';
import { NavLink } from 'react-router-dom';

import { getPokemons, getPokemonPagination, getPokemonFilter } from '../../store/actions/pokemonActions';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';


const Pokemons = ({ getPokemons, getPokemonPagination, getPokemonFilter, pokemons }) => {
    const location = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(location.search);
    const skip = parseInt(query.get('skip')) || 12;
    const limit = parseInt(query.get('limit')) || 40;

    useEffect(() => {
        console.log('A dentro de useEffect')
        getPokemons()
    }, []);
    const handlePevious = () =>{
        if(skip > 0){
            query.set('skip', skip - limit);
            query.set('limit', limit);
            history.push({search: query.toString()})
            getPokemonPagination(skip, limit)
        }
    }
    const handleNext = () =>{
        query.set('skip', skip + limit);
        query.set('limit', limit);
        history.push({search: query.toString()})
        console.log(skip, limit)
        getPokemonPagination(skip, limit)
    }
    const handleChange = (e)=>{
        const ord = e.target.value
        query.set('ord', ord);
        history.push({search: query.toString()})
        const limit = query.get('limit')
        const skip = query.get('skip')
        
        getPokemonFilter(skip, limit, ord)
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
                <button onClick={handlePevious}>Pevious</button>
            <button onClick={handleNext}>Next</button>
            
    <div className='cont-pokemon-search'>
            {
                pokemons.length === 0 ? <h2>Cargando pokemons...</h2> : pokemons.map(pokemon => {
                    return (
                        <NavLink to={`/pokemons/${pokemon.id}`}>
                            <Pokemon
                            key={pokemon.name}
                            name={pokemon.name}
                            types={pokemon.types}
                            img={pokemon.img}
                        />
                        </NavLink>
                    )
                })
            }
    </div>
            
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
    console.log('Paginacion')
    return {
        getPokemons: () => dispatch(getPokemons()),
        getPokemonPagination: (skip, limit)=> dispatch(getPokemonPagination(skip, limit)),
        getPokemonFilter:(skip, limit, ord)=>dispatch(getPokemonFilter(skip, limit, ord))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
