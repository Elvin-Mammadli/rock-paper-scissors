import { CardBets, CardType, GameResult } from "../types/types";

export const getComputerChoice = () => {
  const randomSelect = Math.floor(Math.random() * 3);
  const computerChoice = ["scissors", "rock", "paper"][
    randomSelect
  ] as CardType;
  return computerChoice;
};

export const getUserChoices = (state: {
  rock: number;
  paper: number;
  scissors: number;
}): [CardType] | [CardType, CardType] => {
  const userChoices: [CardType] | [CardType, CardType] = ["paper"];
  userChoices.pop();
  if (state.paper > 0) userChoices.push("paper");
  if (state.rock > 0) userChoices.push("rock");
  if (state.scissors > 0) userChoices.push("scissors");
  return userChoices;
};

export const getGameResult = (
  player: CardType,
  computer: CardType
): CardType | "tie" => {
  if (player === computer) return "tie";

  const winningCombos: Record<CardType, CardType> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
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

export const showAmount = (result: GameResult, cardBets: CardBets) => {
  const { player_position_1, player_position_2, player_result_1 } = result;
  const winningMultiplier = player_position_2 ? 3 : 14;

  if (player_position_1 === "") return;

  if (player_result_1 === "won") {
    return cardBets[player_position_1] * winningMultiplier;
  } else {
    return cardBets[player_position_1];
  }
};

export const showText = ({ player_result_1 }: GameResult) => {
  if (player_result_1 !== "tie") {
    return "You " + player_result_1;
  } else {
    return "Bets returned to balance. ";
  }
};
