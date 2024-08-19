import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { BestOutcome, GameState } from "../../types/types";
import { getBestOutcome, showAmount, showText } from "../../utils/functions";

let timeout: ReturnType<typeof setTimeout>;

const Result: React.FC = () => {
  const { cardBets, gameResult, gameState } = useContext(AppContext);
  const [bestOutcome, setBestOutcome] = useState<BestOutcome | null>(null);
  const [versus, setVersus] = useState<Partial<BestOutcome> | null>(null);

  console.log("bestOutcome", bestOutcome)

  useEffect(() => {
    if (gameState === GameState.END) {
      const bestOutcome = getBestOutcome(gameResult)
      const { computer, player_position } = bestOutcome
      setVersus({ computer, player_position });
      timeout = setTimeout(() => {
        setVersus(null);
        setBestOutcome(bestOutcome);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [gameState]);

  return (
    <div className="flex flex-1 justify-center">
      {
        gameState === GameState.START ? (
          <span className="mt-auto mb-5 uppercase text-yellow-500 font-medium">
            Pick your positions
          </span>
        ) : versus ? (
          <span className="text-white uppercase text-7xl my-auto">
            {versus.computer}
            <span className="text-yellow-600 uppercase mx-6"> vs </span>
            {versus.player_position}
          </span>
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-1">
            <span className="uppercase text-green-400 font-semibold text-3xl">
              {bestOutcome?.won_card !== "tie" ? bestOutcome?.won_card + " won!" : "It's tie"}
            </span>
            <span className="uppercase text-yellow-500 font-medium">
              {showText(bestOutcome?.player_result)}
              <span className="text-white/90">
                {" "}
                {showAmount(bestOutcome, cardBets)}
              </span>
            </span>
          </div>
        )
      }

    </div >
  );
};

export default Result;
