export const getComputerChoice = () => {
  const randomSelect = Math.floor(Math.random() * 3);
  const computerChoice: string = ["scissors", "rock", "paper"][randomSelect];
  return computerChoice;
};
