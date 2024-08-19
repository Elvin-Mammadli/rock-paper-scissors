import React, { ReactNode, useState } from "react";
import {
  getComputerChoice,
  getGameStats,
  getUserChoices,
  updatedBalance,
} from "../utils/functions";
import { GameState, CardType } from "../types/types";
import { initialAppState } from "./helper";
import { AppContext } from "./AppContext";

const AppContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [appState, setAppState] = useState(initialAppState);

  const handleBet = (
    operator: "+" | "-",
    cardType: CardType
  ): void => {
    const balance = appState.balanceStats.balance
    if (balance < 500) {
      alert(`Balance is not enough. Please deposit minimum ${500 - balance}`);
    } else {
      setAppState((prev) => {
        const betChange = operator === "+" ? 500 : -500;

        if (operator === "-" && prev.cardBets[cardType] === 0) return prev;

        return {
          ...prev,
          balanceStats: {
            ...prev.balanceStats,
            balance: prev.balanceStats.balance - betChange,
            bet: prev.balanceStats.bet + betChange,
          },
          cardBets: {
            ...prev.cardBets,
            [cardType]: prev.cardBets[cardType] + betChange,
          },
        };
      });
    }
  };

  const playGame = () => {
    const { balanceStats, cardBets } = appState
    const computerChoice = getComputerChoice();
    const userChoices = getUserChoices(cardBets);

    const gameResult = getGameStats(userChoices, computerChoice);
    const updatedBalanceStats = updatedBalance(balanceStats, gameResult, cardBets)

    setAppState((prev) => ({
      ...prev,
      gameResult,
      gameState: GameState.END,
      balanceStats: {
        ...prev.balanceStats,
        ...updatedBalanceStats,
      }
    }));
  };

  const resetGame = () => {
    setAppState((prev) => ({
      ...prev,
      gameState: GameState.START,
      cardBets: initialAppState.cardBets,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...appState,
        handleBet,
        playGame,
        resetGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
