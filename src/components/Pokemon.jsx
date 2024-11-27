import { useEffect } from "react";
import { useState } from "react";

function Pokemon() {

const [pokemon, setPokemon] = useState([]);

async function fetchPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    const resData = await fetch(url);
    const data = await resData.json();

    let pokemonDetails = await Promise.all(
        data.results.map(async (item) => {
            const resDataDetails = await fetch(item.url);
            const dataDetails = await resDataDetails.json();
            return dataDetails;
        })
    );

    setPokemon(pokemonDetails);
}

useEffect(() => {
    fetchPokemon();
}, []);

  return (
    <div className="wrapper">
      <div className="content">
        <div className="grid">
            {pokemon.map((item, index) => {
                return (
                    <div className="item" key={index}>
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
