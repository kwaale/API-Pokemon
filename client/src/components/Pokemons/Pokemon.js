import React from 'react'
import './Pokemons.css';

const Pokemon = ({name, types, img})=>{
    
    return(
        <div className='card-pokemon'>
            <h1>{name}</h1>
            {types.map(t=><p>{t},</p>)}
            <img className='image' src={img}/>
        </div>
    )
}
export default Pokemon;