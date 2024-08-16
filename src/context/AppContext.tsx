import React, { ReactNode, createContext, useState } from "react";
import {
  getComputerChoice,
  getGameStats,
  getUserChoices,
} from "../utils/functions";
import { BetResult, GameState } from "../types/types";

interface AppContext {
  gameState: 0 | 1;
  betResult: 0 | 1 | 2 | 3;
  wonCard: "scissors" | "rock" | "paper";
  balanceStats: {
    balance: number;
    bet: number;
    win: number;
  };
  cardBets: {
    rock: number;
    paper: number;
    scissors: number;
  };
  handleBet: (
    operator: "+" | "-",
    cardType: "scissors" | "rock" | "paper"
  ) => void;
  playGame: () => void;
  resetGame: () => void;
}

export const AppContext = createContext<AppContext>({
  gameState: GameState.START,
  betResult: BetResult.START,
  wonCard: "scissors",
  balanceStats: {
    balance: 0,
    bet: 0,
    win: 0,
  },
  cardBets: {
    rock: 0,
    paper: 0,
    scissors: 0,
  },
  handleBet: () => {},
  playGame: () => {},
  resetGame: () => {},
});

type Props = {
  children: ReactNode;
};

const initialAppState: AppContext = {
  gameState: GameState.START,
  betResult: BetResult.START,
  wonCard: "scissors",
  balanceStats: {
    balance: 5000,
    bet: 0,
    win: 0,
  },
  cardBets: {
    rock: 0,
    paper: 0,
    scissors: 0,
  },
  handleBet: () => {},
  playGame: () => {},
  resetGame: () => {},
};

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [appState, setAppState] = useState(initialAppState);

  const handleBet = (
    operator: "+" | "-",
    cardType: "scissors" | "rock" | "paper"
  ): void => {
    if (operator == "+") {
      setAppState((prev) => ({
        ...prev,
        balanceStats: {
          ...prev.balanceStats,
          balance: prev.balanceStats.balance - 500,
          bet: prev.balanceStats.bet + 500,
        },
        cardBets: {
          ...prev.cardBets,
          [cardType]: prev.cardBets[cardType] + 500,
        },
      }));
    } else if (appState.cardBets[cardType] == 0) return;
    else {
      setAppState((prev) => ({
        ...prev,
        balanceStats: {
          ...prev.balanceStats,
          balance: prev.balanceStats.balance + 500,
          bet: prev.balanceStats.bet - 500,
        },
        cardBets: {
          ...prev.cardBets,
          [cardType]: prev.cardBets[cardType] - 500,
        },
      }));
    }
  };

  const playGame = () => {
    const computerChoice = getComputerChoice();
    const userChoices = getUserChoices(appState.cardBets);

    const gameResult = getGameStats(userChoices, computerChoice);
    console.log(gameResult);

    // console.log(computerChoice, userChoices, result);
  };

  const resetGame = () => {
    setAppState((prev) => ({
      ...prev,
      gameState: GameState.START,
      cardBets: initialAppState.cardBets,
      betResult: initialAppState.betResult,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        gameState: appState.gameState,
        balanceStats: appState.balanceStats,
        wonCard: appState.wonCard,
        cardBets: appState.cardBets,
        betResult: appState.betResult,
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
