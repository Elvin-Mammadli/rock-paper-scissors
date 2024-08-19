import { PAPER, ROCK, SCISSORS } from "../constants/constants";
import { BalanceStats, BestOutcome, CardBets, CardType, GameResult } from "../types/types";

export const getComputerChoice = () => {
  const randomSelect = Math.floor(Math.random() * 3);
  const computerChoice = [SCISSORS, ROCK, PAPER][
    randomSelect
  ] as CardType;
  return computerChoice;
};

export const getUserChoices = (state: CardBets): [CardType] | [CardType, CardType] => {
  const userChoices: [CardType] | [CardType, CardType] = [PAPER];
  userChoices.pop();
  if (state.paper > 0) userChoices.push(PAPER);
  if (state.rock > 0) userChoices.push(ROCK);
  if (state.scissors > 0) userChoices.push(SCISSORS);
  return userChoices;
};

export const getGameResult = (
  player: CardType,
  computer: CardType
): CardType | "tie" => {
  if (player === computer) return "tie";

  const winningCombos: Record<CardType, CardType> = {
    rock: SCISSORS,
    paper: ROCK,
    scissors: PAPER,
  };

  return winningCombos[player] === computer ? player : computer;
};

export const getGameStats = (
  userChoices: [CardType] | [CardType, CardType],
  computerChoice: CardType
) => {
  const gameResult: Record<string, string> = {};
  userChoices.forEach((userChoice, i) => {
    gameResult["player_position_" + (i + 1)] = userChoice;
    gameResult["computer"] = computerChoice;
    const result = getGameResult(userChoice, computerChoice);
    if (result === userChoice) {
      // Player Won
      gameResult["player_result_" + (i + 1)] = "won";
    } else if (result === computerChoice) {
      // Player Lost
      gameResult["player_result_" + (i + 1)] = "lost";
    } else {
      // Tie
      gameResult["player_result_" + (i + 1)] = "tie";
    }
    gameResult["won_card_" + (i + 1)] = result;
  });
  return gameResult as GameResult;
};

export const getBestOutcome = (result: GameResult) => {
  const { player_position_2, player_result_1, player_result_2, won_card_2 } =
    result;
  const outcome = {
    computer: result.computer,
    player_position: result.player_position_1,
    player_result: result.player_result_1,
    won_card: result.won_card_1,
  };

  if (!player_position_2 || !won_card_2) return outcome;
  if (
    (player_result_2 === "won" && won_card_2) ||
    (player_result_1 === "lost" && player_result_2 === "tie")
  ) {
    outcome.player_position = player_position_2;
    outcome.player_result = player_result_2;
    outcome.won_card = won_card_2;
  }
  return outcome;
};

export const showAmount = (result: BestOutcome | null, cardBets: CardBets) => {
  if (!result || result.player_position === '') return;
  const { player_position, player_result } = result;
  const isTwoBet = Object.values(cardBets).filter(Boolean).length > 1
  const winningMultiplier = isTwoBet ? 3 : 14;

  if (player_result === "won") {
    return cardBets[player_position] * winningMultiplier;
  } else {
    return cardBets[player_position];
  }
};

export const showText = (player_result: string | undefined) => {
  if (!player_result) return;
  if (player_result !== "tie") {
    return "You " + player_result;
  } else {
    return "Bets returned to balance. ";
  }
};

export const updatedBalance = (balanceStats: BalanceStats, gameResult: GameResult, cardBets: CardBets) => {
  let { balance, win } = balanceStats;
  const bet = balanceStats.bet;
  const { player_position_1, player_position_2, player_result_1, player_result_2, won_card_2 } = gameResult
  const betTwoPositions = !!won_card_2;
  const winningMultiplier = player_position_2 ? 3 : 14;

  if (player_position_1 === '') return

  if (player_result_1 === 'won') {
    win = win + bet * winningMultiplier
    balance = balance + bet * winningMultiplier
  } else if (player_result_1 === 'tie' && !betTwoPositions) {
    balance = balance + bet
  }

  if (player_position_2 && player_result_2 === 'won' && won_card_2 !== 'tie') {
    const bet_amount_2 = cardBets[player_position_2]
    win = win + bet_amount_2 * winningMultiplier
    balance = balance + bet_amount_2 * winningMultiplier
  }

  return { balance, win, bet: 0, }
}