import React, { createContext, useState } from "react";
import {
  getComputerChoice,
  getGameStats,
  getUserChoices,
} from "../utils/functions";
import { IAppContext, GameState, AppContextProviderProps, CardType } from "../types/types";

export const AppContext = createContext<IAppContext>({} as IAppContext);

const initialAppState: IAppContext = {
  gameState: GameState.START,
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
  gameResult: {
    computer: '',
    player_position_1: '',
    player_position_2: '',
    player_result_1: '',
    player_result_2: '',
    won_card_1: '',
    won_card_2: '',
  },
  handleBet: () => { },
  playGame: () => { },
  resetGame: () => { },
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState(initialAppState);

  const handleBet = (
    operator: "+" | "-",
    cardType: CardType
  ): void => {
    // if (operator == "+") {
    //   setAppState((prev) => ({
    //     ...prev,
    //     balanceStats: {
    //       ...prev.balanceStats,
    //       balance: prev.balanceStats.balance - 500,
    //       bet: prev.balanceStats.bet + 500,
    //     },
    //     cardBets: {
    //       ...prev.cardBets,
    //       [cardType]: prev.cardBets[cardType] + 500,
    //     },
    //   }));
    // } else if (appState.cardBets[cardType] == 0) return;
    // else {
    //   setAppState((prev) => ({
    //     ...prev,
    //     balanceStats: {
    //       ...prev.balanceStats,
    //       balance: prev.balanceStats.balance + 500,
    //       bet: prev.balanceStats.bet - 500,
    //     },
    //     cardBets: {
    //       ...prev.cardBets,
    //       [cardType]: prev.cardBets[cardType] - 500,
    //     },
    //   }));
    // }

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
  };

  const playGame = () => {
    const computerChoice = getComputerChoice();
    const userChoices = getUserChoices(appState.cardBets);

    const gameResult = getGameStats(userChoices, computerChoice);

    const updatedBalance = () => {
      let balance = appState.balanceStats.balance;
      const bet = appState.balanceStats.bet;
      const { player_position_1, player_position_2, player_result_1, player_result_2, won_card_2 } = gameResult
      const betTwoPositions = !!won_card_2;
      const winningMultiplier = player_position_2 ? 3 : 14;

      if (player_position_1 === '') return

      console.log("balance_1: ", balance)

      if (player_result_1 === 'won') {
        balance = balance + bet * winningMultiplier
      } else if (player_result_1 === 'tie' && !betTwoPositions) {
        balance = balance + bet
      }

      console.log("balance_2: ", balance)

      if (player_position_2 && player_result_2 === 'won' && won_card_2 !== 'tie') {
        const bet_amount_2 = appState.cardBets[player_position_2]
        balance = balance + bet_amount_2 * winningMultiplier
      }

      console.log("balance_3: ", balance)

      return { balance }
    }

    setAppState((prev) => ({
      ...prev,
      gameResult,
      gameState: GameState.END,
      balanceStats: {
        ...prev.balanceStats,
        ...updatedBalance(),
        bet: 0
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

  console.log(appState)

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
