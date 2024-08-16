import { CardType } from "../types/types";

export const getComputerChoice = () => {
  const randomSelect = Math.floor(Math.random() * 3);
  const computerChoice = ["scissors", "rock", "paper"][randomSelect] as
    | "scissors"
    | "rock"
    | "paper";
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
  if (
    (player === "paper" && computer === "scissors") ||
    (player === "scissors" && computer === "paper")
  )
    return "scissors";
  if (
    (player === "paper" && computer === "rock") ||
    (player === "rock" && computer === "paper")
  )
    return "paper";
  if (player === "paper" && computer === "paper") return "tie";
  if (player === "scissors" && computer === "scissors") return "tie";
  if (player === "rock" && computer === "rock") return "tie";
  else return "rock";
};

export const getGameStats = (
  userChoices: [CardType] | [CardType, CardType],
  computerChoice: CardType
) => {
  // {
  //   computer: 'rock',
  //   player: 'scissors',
  //   who_won: 'tie'
  //   won_card: '',
  // }

  const gameStats: { [key: string]: string } = {};
  userChoices.forEach((userChoice, i) => {
    gameStats["player"] = userChoice;
    gameStats["computer"] = computerChoice;
    const result = getGameResult(userChoice, computerChoice);
    if (result === "tie") {
      gameStats["who_won"] = result;
      gameStats["won_card"] = "";
    } else {
      if (i === 1) {
        gameStats["who_won"] = result === userChoice ? "player" : "tie";
        gameStats["won_card"] = "";
      }
      gameStats["won_card"] = result;
    }
  });
  return gameStats;
};

// userChoices.forEach((userChoice, i) => {
// res["player_position_" + (i + 1)] = userChoice;
// res["computer"] = computerChoice;
// res["result_" + (i + 1)] = getWonCard(userChoice, computerChoice);
// };
