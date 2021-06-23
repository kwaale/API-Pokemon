import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPokemonId } from '../../store/actions/pokemonActions';
import { useParams } from 'react-router-dom';
import './Pokemons.css';

const PokemonDetail = ({ pokemon, getPokemonId }) => {
    // const capitalize = (val) => {
    //     return val.toLowerCase()
    //         .trim()
    //         .split(' ')
    //         .map(v => v[0].toUpperCase() + v.substr(1))
    //         .join(' ');
    // }
    // console.log('pokemon.name')
    const { id } = useParams();
    // llega el parametro
    // console.log('ID Params', id)
    // getPokemonName(id);
    useEffect(() => {
        // console.log('PokemonDetail useEffect(()')
        getPokemonId(id)
    }, [])
    // console.log('POKEMON', pokemon.name)

    return (
        <div className='cont-pokemon-search'>
            <div className='card-pokemon'>
                <p>Id: {pokemon.id}</p>
                <h1>{pokemon.name}</h1>
                {/* <h1>{capitalize(pokemon.name)}</h1> */}
                {pokemon.types && pokemon.types.map(t => <h4>{t}</h4>)}
                {/* {pokemon.types && pokemon.types.map(t => <h4>{capitalize(t)}</h4>)} */}
                <img className='image' src={pokemon.img} />
                <p>Defense:{pokemon.defense}</p>
                <p>Height:{pokemon.height}</p>
                <p>Life:{pokemon.life}</p>
                <p>Speed:{pokemon.speed}</p>
                <p>Strong:{pokemon.strength}</p>
                <p>Weight:{pokemon.weight}</p>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    // console.log('Estado de PokemonDetail: estado', state)
    return {
        pokemon: state.pokemon
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonId: (name) => dispatch(getPokemonId(name)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);