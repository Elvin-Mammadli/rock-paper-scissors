import { PAPER, ROCK, SCISSORS } from "@/constants";
import {
  BalanceStats,
  BestOutcome,
  CardBets,
  CardType,
  GameResult,
} from "@/types";

export const getComputerChoice = () => {
  const randomSelect = Math.floor(Math.random() * 3);
  const computerChoice = [SCISSORS, ROCK, PAPER][randomSelect] as CardType;
  return computerChoice;
};

export const getUserChoices = (
  cardBets: CardBets
): [CardType] | [CardType, CardType] => {
  const userChoices: [CardType] | [CardType, CardType] = [PAPER];
  userChoices.pop();
  if (cardBets.paper > 0) userChoices.push(PAPER);
  if (cardBets.rock > 0) userChoices.push(ROCK);
  if (cardBets.scissors > 0) userChoices.push(SCISSORS);
  return userChoices;
};

export const isTwoBets = (cardBets: CardBets): boolean =>
  Object.values(cardBets).filter(Boolean).length > 1;

export const getWinningCard = (
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

export const getGameResult = (
  userChoices: [CardType] | [CardType, CardType],
  computerChoice: CardType
) => {
  const gameResult: Record<string, string> = {};
  userChoices.forEach((userChoice, i) => {
    gameResult["player_position_" + (i + 1)] = userChoice;
    gameResult["computer"] = computerChoice;
    const winningCard = getWinningCard(userChoice, computerChoice);
    if (winningCard === userChoice) {
      // Player Won
      gameResult["player_result_" + (i + 1)] = "won";
    } else if (winningCard === computerChoice) {
      // Player Lost
      gameResult["player_result_" + (i + 1)] = "lost";
    } else {
      // Tie
      gameResult["player_result_" + (i + 1)] = "tie";
    }
    gameResult["won_card_" + (i + 1)] = winningCard;
  });
  return gameResult as GameResult;
};

export const getBestOutcome = (gameResult: GameResult): BestOutcome => {
  const { player_position_2, player_result_1, player_result_2, won_card_2 } =
    gameResult;
  const outcome = {
    computer: gameResult.computer,
    player_position: gameResult.player_position_1,
    player_result: gameResult.player_result_1,
    won_card: gameResult.won_card_1,
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

export const showAmount = (
  result: BestOutcome | null,
  cardBets: CardBets
): number | undefined => {
  if (!result || result.player_position === "") return;
  const { player_position, player_result } = result;
  const betsArray = Object.values(cardBets).filter(Boolean);
  const sumBet = betsArray.reduce((acc, cum) => acc + cum);
  const isTwoBet = betsArray.length > 1;
  const winningMultiplier = isTwoBet ? 3 : 14;

  if (player_result === "won") {
    return cardBets[player_position] * winningMultiplier;
  } else {
    return sumBet;
  }
};

export const showText = (
  player_result: string | undefined,
  isTwoBets: boolean
): string | undefined => {
  if (!player_result) return;

  if (player_result === "tie") {
    return isTwoBets ? "You lost" : "Bets returned to balance. ";
  } else if (player_result !== "tie") {
    return "You " + player_result;
  }
};

export const updatedBalance = (
  balanceStats: BalanceStats,
  gameResult: GameResult,
  cardBets: CardBets
): BalanceStats | undefined => {
  let { balance, win } = balanceStats;
  const {
    player_position_1,
    player_position_2,
    player_result_1,
    player_result_2,
    won_card_2,
  } = gameResult;
  const betTwoPositions = !!won_card_2;
  const winningMultiplier = player_position_2 ? 3 : 14;

  if (player_position_1 === "") return;

  if (player_result_1 === "won") {
    win = win + cardBets[player_position_1] * winningMultiplier;
    balance = balance + cardBets[player_position_1] * winningMultiplier;
  } else if (player_result_1 === "tie" && !betTwoPositions) {
    balance = balance + cardBets[player_position_1];
  }

  if (player_position_2 && player_result_2 === "won" && won_card_2 !== "tie") {
    const bet_amount_2 = cardBets[player_position_2];
    win = win + bet_amount_2 * winningMultiplier;
    balance = balance + bet_amount_2 * winningMultiplier;
  }

  return { balance, win, bet: 0 };
};
