import React from "react";
import { motion } from "framer-motion";
import "./Cell.css";

export function Cell(props) {
  const cell = props.cell;
  const index = props.cellIndex;
  const updateCell = props.updateCell;
  const drawnCard = props.drawnCard;
  const newPatternWasMatched = props.newPatternWasMatched;
  const updateIsNewMatch = props.updateIsNewMatch;
  const isClicked = cell.isClicked;
  const isMatched = cell.isMatched;

  const freeCellStyle = cell.name === "Movie Bingo" ? "movieBingo" : "";

  // const newPatternMatchedStyle = newPatternWasMatched ? "animate" : "";
  // const style = isMatched
  //   ? `cell matchedPattern ${newPatternMatchedStyle} ${freeCellStyle}`
  //   : isClicked
  //   ? `cell strickeout ${newPatternMatchedStyle} ${freeCellStyle}`
  //   : `cell unTouched ${newPatternMatchedStyle}`;

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
    setTimeout(() => updateIsNewMatch(false), 2000);
  }

  const onClickHandler = () => {
    //updateCell(index);
    if (isClicked === false && cell.name === drawnCard.name) {
      updateCell(index);
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
