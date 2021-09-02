import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemon } from '../Actions/PokemonActions';
import _ from "lodash";
import PokemonList from './PokemonList';
import { capitalizeFirst } from '../capitalize';
import { NavLink } from 'react-router-dom';

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);
    React.useEffect( () => {
        dispatch(GetPokemon(pokemonName))
    }, []);

    const ShowData = () => {
        if(PokemonList.loading) {
            return <p>Loading</p>
        }


        if(!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName]
            return (
                <div className={"pokemon-wrapper"}>
                    <h1>{capitalizeFirst(pokemonName)}</h1>
                    <div className={"item"}>
                        <h1>Images</h1>
                        <img src ={pokeData.sprites.front_default} alt ="Front View of Pokemon"/>
                        <img src ={pokeData.sprites.back_default} alt ="Back View of Pokemon"/>
                    </div>
                    <div className={"item"}>
                        <h1>Stats</h1>
                        {pokeData.stats.map(el => {
                            return <p>{capitalizeFirst(el.stat.name) + ":"} {el.base_stat}</p>
                        })}
                    </div>
                    <div className={"item abilities"}>
                        <h1>Abilities</h1>
                        {pokeData.abilities.map(el => {
                            return <p>{"-" + capitalizeFirst(el.ability.name)}</p>
                        })}
                    </div>

                </div>
            )
        }

        if (pokemonState.loading) {
            return (
                <div>
                    <p>Loading...</p>
                    <p>If this is taking a long time, you may have entered an incorrect Pokemon name</p>
                    <NavLink to={"/pokemon/"}>Back to home</NavLink>
                </div>
            ) 
        }

        if(pokemonState.errorMsg !== "") {
            return <p>{pokemonState.errorMsg}</p>
        }

        return <NavLink to={"/pokemon/"}>Error retrieving Pokemon</NavLink>
        
    }

    return(
        <div className="poke">
            {ShowData()}
        </div>
    )
};

export default Pokemon;