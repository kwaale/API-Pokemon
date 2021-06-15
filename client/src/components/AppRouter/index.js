
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
// import CountriesCards from '../CountriesCards';
// import CountryDetail from '../CountryDetail';
import Search from '../Search';
import ButtonHome from '../ButtonHome';
import FormCreaPokemon from '../FormCreaPokemon';
import Pokemons from '../Pokemons';
import Nav from '../Nav';

const AppRouter = () => {
    return (
        <Router>
                <Route path="*" component={Nav} />
            <Switch>
                {/* <Route path="/countries/:id" component={CountryDetail} /> */}
                <Route path="/pokemons/create" component={FormCreaPokemon} />
                <Route path="/pokemons/">
                    <Search/>
                    <Pokemons/>
                </Route>
                <Route path="/" component={ButtonHome} />
                {/* <Route path="/pokemons" component={ButtonHome} /> */}
                <Route path="*"><h1>Error 404 crear componente</h1></Route>

                {/* <Route path="/countries??name="..."" component={CountriesCards}/> */}
            </Switch>
        </Router>
    )
}
export default AppRouter;