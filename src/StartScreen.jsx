import React from "react";
import { useState } from "react";
import { Bingo } from "./Bingo";
import "./StartScreen.css";
import gameAudio from "./assets/sound.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Startscreen = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const onStartClick = () => {
    setIsGameStarted(true);
    document.getElementById("gameAudio").play();
  };

  return (
    <div className="startScreen">
      {!isGameStarted && (
        <>
          <div className="startScreen">
            <h1 className="welcome">MOVIE BINGO!</h1>
            <h2 className="theme">
              Remember your favourite classical Movie ?{" "}
            </h2>
            <p>
              Match iconic movie quotes with movie names on your bingo card.
              Achieve bingo with rows, columns, or diagonals. Have fun with
              Movie Quotes Bingo! 🎉 Press Play to start.
            </p>
            <div className="startScreenButton" onClick={onStartClick}>
              <FontAwesomeIcon icon={faPlay} />
            </div>
          </div>
        </>
      )}
      {isGameStarted && <Bingo />}
      <audio id="gameAudio" loop>
        <source src={gameAudio} type="audio/mp3" /> audio not supported by
        browser
      </audio>
    </div>
  );
};
export default Startscreen;
