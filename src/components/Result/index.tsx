import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { GameState } from "../../types/types";
import { getBestOutcome, showAmount, showText } from "../../utils/functions";

let timeout: ReturnType<typeof setTimeout>;

const Result: React.FC = () => {
  const { cardBets, gameResult, gameState } = useContext(AppContext);
  const [showVersus, setShowVersus] = useState({
    computer: "",
    player_position: "",
  });

  const [showBottomText, setBottomText] = useState({
    computer: "",
    player_position: "",
  });

  const renderResult = () => {
    const { won_card_1 } = gameResult;

    if (gameState === GameState.END) {
      timeout = setTimeout(() => {
        setShowResult(
          <span className="text-white uppercase text-7xl my-auto">
            {getBestOutcome(gameResult).computer}
            <span className="text-yellow-600 uppercase mx-6"> vs </span>
            {getBestOutcome(gameResult).player_position}
          </span>
        );
      }, 0);

      timeout = setTimeout(() => {
        setShowResult(
          <div className="flex flex-col justify-center items-center gap-y-1">
            <span className="uppercase text-green-400 font-semibold text-3xl">
              {won_card_1 !== "tie" ? won_card_1 + " won!" : "It's tie"}
            </span>
            <span className="uppercase text-yellow-500 font-medium">
              {showText(gameResult)}
              <span className="text-white/90">
                {" "}
                {showAmount(gameResult, cardBets)}
              </span>
            </span>
          </div>
        );
      }, 2000);
    }
  };
  console.log(gameResult);

  useEffect(() => {
    renderResult();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-1 justify-center">
      {gameState === GameState.START ? (
        <span className="mt-auto mb-5 uppercase text-yellow-500 font-medium">
          Pick your positions
        </span>
      ) : null}
      {/* {gameState === GameState.START ? null : showResult} */}

      <span className="text-white uppercase text-7xl my-auto">
        {showResult.computer}
        <span className="text-yellow-600 uppercase mx-6"> vs </span>
        {showResult.player_position}
      </span>

      <div className="flex flex-col justify-center items-center gap-y-1">
        <span className="uppercase text-green-400 font-semibold text-3xl">
          {won_card_1 !== "tie" ? won_card_1 + " won!" : "It's tie"}
        </span>
        <span className="uppercase text-yellow-500 font-medium">
          {showText(gameResult)}
          <span className="text-white/90">
            {" "}
            {showAmount(gameResult, cardBets)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Result;
