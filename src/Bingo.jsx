import React from "react";
import { useState } from "react";
import "./Bingo.css";
import { BingoBoard } from "./BingoBoard";
import { bingoData, matchedPartternsData, freeMiddleCell } from "./BingoData";
import { shuffle, selectFirstRandomData } from "./utils";
import { Card } from "./PlayCard";

const shuffledData = shuffle(bingoData);
shuffledData.splice(12, 0, freeMiddleCell);
const firstRandomCard = selectFirstRandomData(shuffledData);

export function Bingo() {
  const [partternsData, setPartterns] = useState(matchedPartternsData);
  const [randomData, setRandomData] = useState(firstRandomCard);
  const [boardData, setBoardData] = useState(shuffledData);

  const updatePatterns = (matchedIndex) => {
    const copyOfPatterns = [...partternsData];
    const matchedPattern = copyOfPatterns.splice(matchedIndex, 1)[0];

    const copyOfBoardData = [...boardData];
    copyOfBoardData.forEach((cell, index) => {
      if (matchedPattern.includes(index)) {
        cell.isMatched = true;
        copyOfBoardData[index] = cell;
      }
    });
    setBoardData(copyOfBoardData);
    setPartterns(copyOfPatterns);
  };

  const updateBoardData = (index) => {
    const copyOfBoardData = [...boardData];
    const cell = copyOfBoardData[index];
    cell.isClicked = true;
    copyOfBoardData[index] = cell;
    setBoardData(copyOfBoardData);
  };

  /**
   * Reference: https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array/34567477#34567477
   */
  const selectNextRandomData = () => {
    const unClickedData = boardData.filter((cell) => cell.isClicked === false);
    const randIndex = Math.floor(Math.random() * unClickedData.length);
    const newRandomData = unClickedData[randIndex];
    setRandomData(newRandomData);
  };

  return (
    <div className="Bingo">
      <Card card={randomData} playNextCard={selectNextRandomData} />
      <BingoBoard
        data={boardData}
        updateData={updateBoardData}
        partterns={partternsData}
        removeMatchedPattern={updatePatterns}
        card={randomData}
      />
    </div>
  );
}
