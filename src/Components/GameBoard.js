import React, { useState } from "react";
import boardGames from "./boardGames";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const GameBoard = () => {
  const [bingoCards, setBingoCards] = useState(() => {
    const shuffledGames = [...boardGames];
    shuffleArray(shuffledGames);
    return shuffledGames.slice(0, 24).map((game, index) => ({
      id: index,
      gameName: game,
      marked: false,
    }));
  });

  const markCard = (id) => {
    setBingoCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, marked: !card.marked } : card
      )
    );
  };

  return (
    <div>
      <h2>Board Game Bingo</h2>
      <div className="bingo-board">
        {bingoCards.map((card) => (
          <div
            key={card.id}
            className={`bingo-card ${card.marked ? "marked" : ""}`}
            onClick={() => markCard(card.id)}
          >
            {card.gameName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
