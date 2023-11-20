import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./PlayCard.css";

export function Card(props) {
  // use to tell framer-motion to animate the component when the component re-renders
  const [id, setID] = useState(crypto.randomUUID());
  const card = props.card;
  const playNextCard = props.playNextCard;

  return (
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
              playNextCard();
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
