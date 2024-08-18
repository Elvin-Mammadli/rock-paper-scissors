import { CardType, GameResult } from "../types/types";

export const getComputerChoice = () => {
  const randomSelect = Math.floor(Math.random() * 3);
  const computerChoice = ["scissors", "rock", "paper"][randomSelect] as
    CardType;
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
      gameResult["player_result_" + (i + 1)] = 'won'
    } else if (result === computerChoice) {
      // Player Lost
      gameResult["player_result_" + (i + 1)] = 'lost'
    } else {
      // Tie
      gameResult["player_result_" + (i + 1)] = 'tie'
    }
    gameResult['won_card_' + (i + 1)] = result
  });
  return gameResult as GameResult;
};
