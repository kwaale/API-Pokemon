import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import React from 'react';
import { getPokemonName } from '../../store/actions/pokemonActions';
import { connect } from 'react-redux';
import Pokemon from '../Pokemons/Pokemon';
import { useParams, NavLink } from 'react-router-dom';
import './Search.css';

const Search = ({getPokemonName, pokemon }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const name = query.get('name')
    useEffect(() => {
        if (name !== null) {
            console.log('If useEffec name', name)
            getPokemonName(name)
        }

    }, [name])

    // console.log('query',name)
    const initialState = '';

    const [search, setSearch] = useState(initialState)
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value.toLowerCase();
        setSearch(value);
    }

    const handleSubmit = (e) => {
        // if(name && name){
        //     return getPokemon(name)
        // }
        // e.preventDefault()
        // query.set('name',search)
        // history.push({search:query.toString()})
        // getPokemon(search)        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name='name' placeholder='Busca Pokemon...' />
                <input type='submit' value='Search' />
            </form>
            <div className='cont-pokemon-search'>
                {!pokemon.name ? <h1>Pokemon</h1> :
                    <NavLink to={`/pokemons/${pokemon.id}`}>
                        <Pokemon
                            key={pokemon.name}
                            name={pokemon.name}
                            types={pokemon.types}
                            img={pokemon.img}
                        />
                    </NavLink>
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log('mapStateToProps = state', state)
    return {
        pokemon: state.pokemon
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonName: (name) => dispatch(getPokemonName(name)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);