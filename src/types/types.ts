import { ReactNode } from "react";

export enum GameState {
  START,
  END,
}

export type CardType = "scissors" | "rock" | "paper";
export type PlayerResult = "won" | "lost" | "tie";
export type GameResult = {
  computer: CardType | "";
  player_position_1: CardType | "";
  player_position_2?: CardType | "";
  player_result_1: PlayerResult | "";
  player_result_2?: PlayerResult | "";
  won_card_1: CardType | "" | "tie";
  won_card_2?: CardType | "" | "tie";
};

export type CardBets = {
  rock: number;
  paper: number;
  scissors: number;
};

export type BalanceStats = {
  balance: number;
  bet: number;
  win: number;
};

export interface IAppContext {
  gameState: GameState;
  balanceStats: BalanceStats;
  cardBets: CardBets;
  gameResult: GameResult;
  handleBet: (operator: "+" | "-", cardType: CardType) => void;
  playGame: () => void;
  resetGame: () => void;
}

export type AppContextProviderProps = {
  children: ReactNode;
};
