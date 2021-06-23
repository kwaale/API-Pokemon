import React, { useEffect } from 'react';
import Pokemon from './Pokemon';
import { NavLink, useParams } from 'react-router-dom';
import {
    getPokemons,
    getPokemonPagination,
    getPokemonFilter,
    getPokemonsType,
    getOrderAsdName,
    getOrderDesName
} from '../../store/actions/pokemonActions';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';


const Pokemons = ({ getPokemons, getPokemonPagination, getPokemonFilter, getPokemonsType, getOrderAsdName, getOrderDesName, pokemons }) => {
    const location = useLocation();
    const history = useHistory();
    const params = useParams();
    console.log( 'params.skip',params.type)
    const query = new URLSearchParams(location.search);
    const skip = parseInt(query.get('skip')) || 12;
    const limit = parseInt(query.get('limit')) || 40;
    console.log('Afuera useEffect', pokemons)

    useEffect(() => {
        console.log('A dentro de useEffect',params.type)
        if(params.type) getPokemonsType(params.type)
        else getPokemons()
    },[]);
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
    const handleClick = (e) => {
        e.preventDefault()
        const order = e.target.name
        if (order === 'asd') {
            query.set('ord', order);
            history.push({ search: query.toString() })
            getOrderAsdName(pokemons)
        }
        if (order === 'des') {
            query.set('ord', order);
            history.push({ search: query.toString() })
            getOrderDesName(pokemons)
        }

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
            
                <button onClick={handleClick} name='asd'>Nombre Ascendente</button>
                <button onClick={handleClick} name='des'>Nombre Descendente</button>
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
    console.log('Paginacion')
    return {
        getPokemons: () => dispatch(getPokemons()),
        getPokemonPagination: (skip, limit)=> dispatch(getPokemonPagination(skip, limit)),
        getPokemonFilter:(skip, limit, ord)=>dispatch(getPokemonFilter(skip, limit, ord)),
        getPokemonsType:(type)=>dispatch(getPokemonsType(type)),
        getOrderAsdName:(pokemons)=>dispatch(getOrderAsdName(pokemons)),
        getOrderDesName:(pokemons)=>dispatch(getOrderDesName(pokemons)),
        
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);
