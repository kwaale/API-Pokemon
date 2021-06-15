import {useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import React from 'react';
import {getPokemon } from '../../store/actions/pokemonActions';
import { connect }from 'react-redux';
import Pokemon from '../Pokemons/Pokemon';

const Search = ({getPokemon, pokemon})=>{
    const location = useLocation();
    const history = useHistory()
    const query = new URLSearchParams(location.search);
    
    const name = query.get('name')
    console.log('query',name)
    const initialState = '';

    const [search, setSearch] = useState(initialState)
    const handleChange = (e)=>{
        e.preventDefault();
        const value= e.target.value;
        setSearch(value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        query.set('name',search)
        history.push({pathname: "/pokemons", search:`?name=${search}`})
        console.log(' submit name', search, pokemon)
        getPokemon(search)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} name='name' placeholder='Busca Pokemon...'/>
                    <input type='submit'  value='Search'/>
            </form>
            {!pokemon.name ? console.log('pokemon true',pokemon):
            <Pokemon
            key={pokemon.name}
            name={pokemon.name}
            types={pokemon.types}
            img={pokemon.img}
            />
            }
        </div>
    )
}
const mapStateToProps = (state)=>{
    console.log('mapStateToProps = state',state )
    return{
        pokemon:state.pokemon
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getPokemon:(name)=>dispatch(getPokemon(name)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search);