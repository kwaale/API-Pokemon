import React from 'react';
import { NavLink } from 'react-router-dom';

const ButtonHome = () => {
    return (
        <div>
            <NavLink to='/pokemons'>
            <button type="button">Home</button>
            </NavLink>
            
        </div>
    )
}
export default ButtonHome;