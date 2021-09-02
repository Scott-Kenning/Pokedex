import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import _ from "lodash";
import { GetPokemonList } from '../Actions/PokemonActions';
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import { capitalizeFirst } from "../capitalize"

const PokemonList = (props) => {
    const [search, setSearch] = useState();
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);
    React.useEffect( () => {
        FetchData(1)
    }, []);

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    const handleSearchInputKeyPress = event => {
        if(event.key === 'Enter') {
            props.history.push(`/pokemon/${search.toLowerCase()}`)
            console.log('Enter Key Pressed')
        }
    }

    const ShowData = () => {
        if (!_.isEmpty(pokemonList.data)) {
            return(
                <div className={"list-wrapper"}>
                  {pokemonList.data.map(el => {
                    return(
                      <div className={"pokemon-item"}>
                        <p>{capitalizeFirst(el.name)}</p>
                        <Link to={`/pokemon/${el.name}`}>View</Link>
                      </div>
                    )
                  })}
                </div>
              )
        }

        if(pokemonList.loading) {
            return <p>Loading</p>
        }
        
        if (pokemonList.errorMsg !== "") {
            return <p>{pokemonList.errorMsg}</p>
        }

        return <p>unable to get data</p>
    }
    return(
        <div>
            <div className="search-wrapper">
                <h2>Search Pokemon: </h2>
                <input type="text" className="search-bar" onChange={e => setSearch(e.target.value)} onKeyPress={handleSearchInputKeyPress}/>
                <button className="search-button" 
                onClick={() => props.history.push(`/pokemon/${search.toLowerCase()}`)} >Search</button>
            </div>
            {ShowData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                    pageCount =  {Math.ceil(pokemonList.count / 15)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => FetchData(data.selected + 1)}
                    containerClassName="pagination"
                />
            )}
        </div>
    )
};

export default PokemonList;