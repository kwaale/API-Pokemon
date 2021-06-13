import {useState} from 'react'
import React from 'react';

const Search = ()=>{
    const [state, setState] = useState({
        search:'',

    })
    const handleChange = (e)=>{
        e.preventDefault();
        const name = e.target.name
        const value= e.target.value;
        setState({
            ...state,
            [name]:value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('State', state)
    }
    return(
        <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name='search' placeholder='Busca Pokemon...'/>
                <input type='submit'  value='Search'/>
        </form>
    )
}
export default Search;