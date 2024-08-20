import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { BestOutcome, GameState } from "@/types";
import {
  getBestOutcome,
  isTwoBets,
  showAmount,
  showText,
} from "@/utils/functions";

const Result: React.FC = () => {
  const { cardBets, gameResult, gameState } = useContext(AppContext);
  const [bestOutcome, setBestOutcome] = useState<BestOutcome | null>(null);
  const [versus, setVersus] = useState<Partial<BestOutcome> | null>(null);

  console.log(gameResult);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (gameState === GameState.END) {
      const bestOutcome = getBestOutcome(gameResult);
      const { computer, player_position } = bestOutcome;
      setVersus({ computer, player_position });
      timeoutId = setTimeout(() => {
        setVersus(null);
        setBestOutcome(bestOutcome);
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [gameState]);

  const renderContent = () => {
    if (gameState === GameState.START) {
      return (
        <span className="mt-auto mb-5 uppercase text-yellow-500 font-medium">
          Pick your positions
        </span>
      );
    } else if (versus) {
      return (
        <span className="text-white uppercase text-7xl my-auto">
          {versus.computer}
          <span className="text-yellow-600 uppercase mx-6"> vs </span>
          {versus.player_position}
        </span>
      );
    } else {
      return (
        <div className="flex flex-col justify-center items-center gap-y-1">
          <span className="uppercase text-green-400 font-semibold text-3xl">
            {bestOutcome?.won_card !== "tie"
              ? bestOutcome?.won_card + " won!"
              : "It's tie"}
          </span>
          <span className="uppercase text-yellow-500 font-medium">
            {showText(bestOutcome?.player_result, isTwoBets(cardBets))}
            <span className="text-white/90">
              {" " + showAmount(bestOutcome, cardBets)}
            </span>
          </span>
        </div>
      );
    }
  };

  return <div className="flex flex-1 justify-center">{renderContent()}</div>;
};

export default Result;
