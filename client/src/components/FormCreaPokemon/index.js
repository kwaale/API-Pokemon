import React, { useState, useEffect } from 'react';
import { getAllTypes } from '../../store/actions/pokemonActions';
import { connect } from 'react-redux';

const FormCreaPokemon = ({ getAllTypes, types }) => {
    useEffect(() => {
        getAllTypes()
    }, []);
    const initialStateForm = {name: '', life: '', strength: '', defense: '', speed: '',
    height: '', weight: '', types: [], img: '', create:false}
    const [formState, setFormState] = useState(initialStateForm);
    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'types') {
            formState.types.includes(value) ?
                setFormState({
                    ...formState,
                    types: [...formState.types.filter(element => element !== value)]
                }) :
                setFormState({
                    ...formState,
                    types: [...formState.types, value]
                });
        } else {
            setFormState({
                ...formState,
                [name]: value
            });
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        postPokemon()
        setFormState({...initialStateForm,
            create:true
            })
    }
    const postPokemon = async() => {
        await fetch('http://localhost:3001/pokemons/create',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        });
    }
    const handleTypes = (e)=>{
        e.preventDefault();
        setFormState({
            ...formState,
            types:formState.types.filter(type=>type !== e.target.id)
        })
    }
    return (

        <div>
            <h1>Crea tu Pokemon</h1>
            <form onSubmit={handleSubmit}>
                <dt><label>Nombre:</label>
                    <input placeholder='Nombre...' name='name' onChange={handleChange} value={formState.name}></input></dt>
                <dt><label>Vida:</label>
                    <input placeholder='Vida...' name='life' onChange={handleChange} value={formState.life}></input></dt>
                <dt><label>Fuerza:</label>
                    <input placeholder='Fuerza...' name='strength' onChange={handleChange} value={formState.strength}></input></dt>
                <dt><label>Defensa:</label>
                    <input placeholder='Defensa...' name='defense' onChange={handleChange} value={formState.defense}></input></dt>
                <dt><label>Velocidad:</label>
                    <input placeholder='Velocidad...' name='speed' onChange={handleChange} value={formState.speed}></input></dt>
                <dt><label>Altura:</label>
                    <input placeholder='Altura...' name='height' onChange={handleChange} value={formState.height}></input></dt>
                <dt><label>Peso:</label>
                    <input placeholder='Peso...' name='weight' onChange={handleChange} value={formState.weight}></input></dt>
                <dt><label>Tipos:</label>
                    <select name='types' onChange={handleChange}>
                        {types.map(t => {
                            return (
                                <option value={t}>{t.toUpperCase()}</option>
                            )
                        })}
                    </select>
                </dt>
                {formState.types.map(t => {
                    return (
                        <button onClick={handleTypes} id={t}>{t.toUpperCase()}</button>
                    )
                })}
{/* Para colocar imagen */}
                {/* <dt><label>Imagen:</label>
                    <input placeholder='Peso...' name='img' onChange={handleChange}></input></dt> */}

                <dt><button type='onSubmit'>Submit</button></dt>
                {formState.create && <h1>Pokemon Creado</h1>}
                
            </form>
        </div>
    )

}
const mapStateToProps = state => {
    console.log('mapStateToProps state', state)
    return {
        types: state.types
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAllTypes: () => dispatch(getAllTypes()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormCreaPokemon);












