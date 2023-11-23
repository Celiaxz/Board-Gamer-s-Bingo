import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./PlayCard.css";
//card component displaying a quote and a button to proceed to the next card
export function Card(props) {
  //state to manage a unique identifier for motion animations
  // use to tell framer-motion to animate the component when the component re-renders
  const [id, setID] = useState(crypto.randomUUID());
  //props destructing
  const card = props.card; //Object containing quote information for current card(all the way from bingodata.js)
  const playNextCard = props.playNextCard; // funtion(Bingo) to proceed to the next card

  return (
    //manages animations when components enter or leave
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, type: "spring", stiffness: 100 }}
        className="playCard"
      >
        <div className="box">
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: -50 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="text"
          >
            <span className="quote">{card.quote}</span>
          </motion.div>
          <label
            className="nextButton"
            onClick={() => {
              //calls the PlayNxtCard Function to get the next random card
              playNextCard();
              //Generates a new randon ID for animation purposes, if not no animation
              setID(crypto.randomUUID());
            }}
          >
            <span>next</span>
          </label>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
