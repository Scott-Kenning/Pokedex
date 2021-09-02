import './App.css';
import react from 'react';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import PokemonList from './Containers/PokemonList';
import Pokemon from './Containers/Pokemon';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={"/pokemon/"}>Pokedex</NavLink>
      </nav>
      <Switch>
        <Route path ={"/pokemon/"} exact component={PokemonList} />
        <Route path ={"/pokemon/:pokemon"} exact component={Pokemon} />
        <Redirect to ={"/pokemon/"} />
      </Switch>

    </div>
  );
}

export default App;
