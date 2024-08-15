import { CardType } from "../types/types";

export const getComputerChoice = () => {
  const randomSelect = Math.floor(Math.random() * 3);
  const computerChoice = ["scissors", "rock", "paper"][randomSelect] as "scissors" | "rock" | "paper";
  return computerChoice;
};

export const getWonCard = (userChoice: CardType, computerChoice: CardType): CardTypes => {
  if (userChoice === 'paper' && computerChoice === 'scissors') return 'scissors'
  if (userChoice === 'paper' && computerChoice === 'rock') return 'paper'
  else return 'rock'
}

export const getGameResult = (userChoices: [CardType, CardType], computerChoice: CardType) => {
  
  userChoices.forEach(userChoice => getWonCard(userChoice, computerChoice))
}