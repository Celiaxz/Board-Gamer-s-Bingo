import React from "react";
import { motion } from "framer-motion";
import "./Cell.css";

export function Cell(props) {
  const cell = props.cell; //current cell's data
  const index = props.cellIndex; //Index of the current cell
  const updateCell = props.updateCell; // Function to update cell state
  const drawnCard = props.drawnCard; // Currently drawn card
  const newPatternWasMatched = props.newPatternWasMatched; // Boolean indicating if a new pattern was matched
  const updateIsNewMatch = props.updateIsNewMatch; // Function to update the new pattern state
  const isClicked = cell.isClicked; // Boolean indicating if the cell is clicked
  const isMatched = cell.isMatched; // Boolean indicating if the cell is matched

  const freeCellStyle = cell.name === "Movie Bingo" ? "movieBingo" : "";

  // const newPatternMatchedStyle = newPatternWasMatched ? "animate" : "";
  // const style = isMatched
  //   ? `cell matchedPattern ${newPatternMatchedStyle} ${freeCellStyle}`
  //   : isClicked
  //   ? `cell strickeout ${newPatternMatchedStyle} ${freeCellStyle}`
  //   : `cell unTouched ${newPatternMatchedStyle}`;

  //Determine the style of the cell based on game state using a ternary operator
  const style = isMatched
    ? `cell matchedPattern ${
        newPatternWasMatched ? "animate" : ""
      } ${freeCellStyle}`
    : isClicked
    ? `cell strickeout ${
        newPatternWasMatched ? "animate" : ""
      } ${freeCellStyle}`
    : `cell unTouched ${newPatternWasMatched ? "animate" : ""}`;

  if (newPatternWasMatched) {
    //if new pattern is matched, update state after 2 secs
    //then set newpatternmatch r=t false after 2 secs to reset to stop
    setTimeout(() => updateIsNewMatch(false), 2000);
  }

  const onClickHandler = () => {
    // updateCell(index);

    if (cell.isClicked === false && cell.name === drawnCard.name) {
      updateCell(index);
      //updates  cell.isclicked to true
    }
  };

  return (
    <motion.button
      className={style}
      onClick={onClickHandler}
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.7 }}
    >
      {cell.name}
    </motion.button>
  );
}
