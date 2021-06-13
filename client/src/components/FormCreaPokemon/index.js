import React, {useState, useEffect} from 'react';
import { getAllTypes } from '../../store/actions/pokemonActions';
import { connect } from 'react-redux';

const FormCreaPokemon = ({getAllTypes, types})=>{
    useEffect(() => {
        getAllTypes()
    }, []);

    const [formState, setFormState] = useState({
        nombre:'',
        vida:'',
        fuerza:'',
        defensa:'',
        velocidad:'',
        altura:'',
        peso:'',
        types:[],
    });
    const handleChange = (e)=>{
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'types'){
            formState.types.includes(value) ?
            setFormState({...formState,
                types:[...formState.types.filter(element=>element !== value)]
            }) :
            setFormState({...formState,
                types:[...formState.types, value]
            });
        }else{
            setFormState({
                ...formState,
                [name]:value
            });
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('Submit',formState)
    }
    return(

        <div>
            <h1>Crea tu Pokemon</h1>
            <form onSubmit={handleSubmit}>
                <dt><label>Nombre:</label>
                    <input placeholder='Nombre...' name='nombre' onChange={handleChange}></input></dt>
                <dt><label>Vida:</label>
                    <input placeholder='Vida...' name='vida' onChange={handleChange}></input></dt>
                <dt><label>Fuerza:</label>
                    <input placeholder='Fuerza...' name='fuerza' onChange={handleChange}></input></dt>
                <dt><label>Defensa:</label>
                    <input placeholder='Defensa...' name='defensa' onChange={handleChange}></input></dt>
                <dt><label>Velocidad:</label>
                    <input placeholder='Velocidad...' name='velocidad' onChange={handleChange}></input></dt>
                <dt><label>Altura:</label>
                    <input placeholder='Altura...' name='altura' onChange={handleChange}></input></dt>
                <dt><label>Peso:</label>
                    <input placeholder='Peso...' name='peso' onChange={handleChange}></input></dt>
                <dt><label>Tipos:</label>
                <select name='types' onChange={handleChange}>
                    {types.map(t=>{
                        return(
                            <option value={t}>{t.toUpperCase()}</option>
                        )
                    })}
                    </select>
                    </dt>
                    {formState.types.map(t=>{
                        return(
                            <li>{t.toUpperCase()}</li>
                        )
                    })}
                <dt><button type='onSubmit'>Submit</button></dt>
            </form>
        </div>
    )

}
const mapStateToProps = state => {
    console.log('mapStateToProps state',state)
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












