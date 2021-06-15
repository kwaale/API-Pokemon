import { NavLink } from 'react-router-dom';
import React from 'react';

const Nav = ()=>{
    return(
        <div>
            <NavLink to='/'>Inicio </NavLink>
            <NavLink to='/pokemons'>Home </NavLink>
            <NavLink to='/pokemons/create'>Crear Pokemons </NavLink>
        </div>
    )
}
export default Nav;