import { GameState, IAppContext } from "@/types/types";

export const initialAppState: IAppContext = {
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
    computer: "",
    player_position_1: "",
    player_position_2: "",
    player_result_1: "",
    player_result_2: "",
    won_card_1: "",
    won_card_2: "",
  },
  handleBet: () => {},
  playGame: () => {},
  resetGame: () => {},
};
