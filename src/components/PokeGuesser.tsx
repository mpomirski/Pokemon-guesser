import "./PokeGuesser.css";
import Timer from "./Timer";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
const MAX_POKEMON_ID = 500;

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function PokeGuesser() {
  const [pokemon, setPokemon] = useState({
    name: "",
    spriteURL: "#",
  });

  const [guessedPokemon, setGuessedPokemon] = useState({
    name: "",
  });
  const [message, setMessage] = useState("");
  const [guessed, setGuessed] = useState(false);
  const [doRestartTimer, setDoRestartTimer] = useState(false);

  function getRandomPokemonID() {
    return getRandomInt(0, MAX_POKEMON_ID);
  }

  const getPokemon = useCallback(async () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemonID()}`)
      .then((res) => {
        const data = res.data;
        setPokemon({ name: data.name, spriteURL: data.sprites.front_default });
      })
      .catch((err) => {
        console.log(err);
      });
    setMessage("");
    setGuessed(false);
  }, []);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guessedPokemon.name === pokemon.name) {
      setMessage("You're right!");
      setGuessed(true);
    } else {
      setMessage("Wrong answer.");
      setGuessed(false);
    }
    await timeout(3000);
    setGuessedPokemon({ name: "" });
    getPokemon();
  };

  function FinishedTimer() {
    console.log("Finished timer!");
  }

  const className = `PokeGuesser ${guessed ? "Success" : "Default"}`;
  return (
    <div className={className}>
      <div className="Container">
        <h1 className="display-3">Who's that pokemon?</h1>
        <img src={pokemon.spriteURL} alt="" className="SpriteImg img-fluid" />
        <form onSubmit={handleOnSubmit} className="FormContainer">
          <div className="m-2">
            <input
              type="text"
              autoFocus
              value={guessedPokemon.name}
              onChange={(event) =>
                setGuessedPokemon({ name: event.target.value })
              }
              className="form-control form-control-lg"
            />
          </div>
          <input
            type="submit"
            value="Guess"
            className="btn btn-primary m-2"
          ></input>
        </form>
        <h2>{message}</h2>
        <div className="ProgressBar">
          <Timer
            countdown={5}
            onFinish={FinishedTimer}
            restart={doRestartTimer}
            setRestart={setDoRestartTimer}
          />
        </div>
        <button onClick={() => setDoRestartTimer(true)}></button>
      </div>
    </div>
  );
}

export default PokeGuesser;
