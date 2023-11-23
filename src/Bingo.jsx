import React from "react";
import { useState } from "react";
import "./Bingo.css";
import { BingoBoard } from "./BingoBoard";
import { bingoData, matchedPartternsData, freeMiddleCell } from "./BingoData";
import { shuffle, selectFirstRandomData } from "./utils";
import { Card } from "./PlayCard";
// Shuffling the bingo data and inserting a free middle cell
const shuffledData = shuffle(bingoData);
shuffledData.splice(12, 0, freeMiddleCell);
// Selecting the random card from shuffled data
const firstRandomCard = selectFirstRandomData(shuffledData);

// Bingo component managing game state and rendering game components
export function Bingo() {
  // State management for patterns, random data, and board data
  const [partternsData, setPartterns] = useState(matchedPartternsData);
  const [randomData, setRandomData] = useState(firstRandomCard);
  const [boardData, setBoardData] = useState(shuffledData);

  // Function to update matched patterns and remove them
  const updatePatterns = (matchedIndex) => {
    const copyOfPatterns = [...partternsData];
    copyOfPatterns.splice(matchedIndex, 1);
    setPartterns(copyOfPatterns);
    // const copyOfBoardData = [...boardData];
    // copyOfBoardData.forEach((cell, index) => {
    //   if (matchedPattern.includes(index)) {
    //     cell.isMatched = true;
    //     copyOfBoardData[index] = cell;
    //   }
    // });
    // setBoardData(copyOfBoardData);
  };

  // Function to update the board data when a cell is clicked
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
  // Function to select the next random data for the card
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
