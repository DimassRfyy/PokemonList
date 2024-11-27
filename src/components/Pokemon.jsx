import { useEffect } from "react";
import { useState } from "react";

function Pokemon() {

const [pokemon, setPokemon] = useState([]);
const [selectedPokemon, setSelectedPokemon] = useState(false);
const [detail, setDetail] = useState([]);

async function fetchPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    const resData = await fetch(url);
    const data = await resData.json();

    let pokemon = await Promise.all(
        data.results.map(async (item) => {
            const resDataDetails = await fetch(item.url);
            const dataDetails = await resDataDetails.json();
            return dataDetails;
        })
    );

    setPokemon(pokemon);
}

 function pokemonDetails() {
      return (<div className="detail" onClick={()=>{setSelectedPokemon(false)}}>
        <div className="item">
          <a>X</a>
          <div className="image">
            <img src={detail.sprites.other.dream_world.front_default} alt="" />
          </div>
          <div className="title">{detail.name}</div>
          <div className="abilities">
            {detail.abilities.map((item, index)=>{
              return (
                <span key={index}>{item.ability.name}</span>
              )
            })}
          </div>
        </div>
      </div>);
    }

useEffect(() => {
    fetchPokemon();
}, []);

  return (
    <div className="wrapper">
      <div className="content">
        {selectedPokemon && pokemonDetails()}
        <div className="grid">
            {pokemon.map((item, index) => {
                return (
                    <div className="item" key={index} onClick={()=>{setSelectedPokemon(true); setDetail(item)}}>
                      <div className="image"><img src={item.sprites.front_default} alt="" /></div>
                        <div className="title">
                            {item.name}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  )
}

export default Pokemon
