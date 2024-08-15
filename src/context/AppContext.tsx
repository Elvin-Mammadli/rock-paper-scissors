import React, { ReactNode, createContext, useState } from "react";
import { getComputerChoice } from "../utils/functions";

interface AppContext {
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
}

export const AppContext = createContext<AppContext>({
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
});

type Props = {
  children: ReactNode;
};

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [appState, setAppState] = useState({
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
  });

  const handleBet = (
    operator: "+" | "-",
    cardType: "scissors" | "rock" | "paper"
  ): void => {
    if (operator == "+") {
      setAppState((prev) => ({
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
    let result = "";
    const computerChoice = getComputerChoice();
    const userChoices = Object.entries(appState.cardBets).map((card) =>
      card[1] > 0 ? card[0] : null
    );
    if (userChoices.includes(computerChoice)) {
      result = "YOU WIN";
    } else result = "YOU LOSE";
    console.log(computerChoice, userChoices, result);
  };
  return (
    <AppContext.Provider
      value={{
        balanceStats: appState.balanceStats,
        cardBets: appState.cardBets,
        handleBet,
        playGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
