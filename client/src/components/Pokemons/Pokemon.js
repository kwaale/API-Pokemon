import React from 'react'
import './Pokemons.css';

const Pokemon = ({ name, types, img }) => {
    const capitalize = (val) => {
        return val.toLowerCase()
            .trim()
            .split(' ')
            .map(v => v[0].toUpperCase() + v.substr(1))
            .join(' ');
    }
    return (
        <div className='card-pokemon'>
            <h1>{capitalize(name)}</h1>
            {types.map(t => <h4>{capitalize(t)}</h4>)}
            <img className='image' src={img} />
        </div>
    )
}
export default Pokemon;
