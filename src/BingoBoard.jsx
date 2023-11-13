import React, { useState } from "react";
import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cell } from "./Cell";
import "./BingoBoard.css";
import bingoWin from "./assets/bingo-removebg.png";

export function BingoBoard(props) {
  const card = props.card;
  const data = props.data;
  const updateData = props.updateData;
  const partterns = props.partterns;
  const removeMatchedPattern = props.removeMatchedPattern;

  const [isNewMatch, setisNewMatch] = useState(false);

  const matchedAPattern = useCallback(() => {
    return partterns.some((pattern) => {
      let numberOfClickedCells = 0;
      pattern.forEach((index) => {
        const cell = data[index];
        if (cell.isClicked === true) {
          numberOfClickedCells++;
        }
      });

      if (numberOfClickedCells === pattern.length) {
        let indexWin = partterns.indexOf(pattern);
        removeMatchedPattern(indexWin);
        return true;
      } else {
        return false;
      }
    });
  }, [partterns, data, removeMatchedPattern]);

  const allCellsHaveBeenClicked = useCallback(() => {
    return data.every((cell) => {
      return cell.isClicked;
    });
  }, [data]);

  useEffect(() => {
    if (matchedAPattern()) {
      setisNewMatch(true);
      console.log("You matched a pattern!!");
    }
    if (allCellsHaveBeenClicked()) {
      console.log("You won!!");
      window.alert("B I N G O");
      window.location.reload();
    }
  }, [data, matchedAPattern, allCellsHaveBeenClicked]);

  return (
    <div className="bingoBoardContainer">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          className={`bingoBoard`}
        >
          {data.map((tool, index) => {
            return (
              <Cell
                key={index}
                cellIndex={index}
                cell={tool}
                updateCell={updateData}
                drawnCard={card}
                newPatternWasMatched={isNewMatch}
                updateIsNewMatch={setisNewMatch}
              />
            );
          })}

          <img
            className={`${isNewMatch ? "matched" : ""}`}
            src={bingoWin}
            alt=""
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
