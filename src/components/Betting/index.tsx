import { useContext } from "react";
import Card from "./_components/Card";
import { AppContext } from "../../context/AppContext";
import { CardType, GameState } from "../../types/types";

const Betting: React.FC = () => {
  const { cardBets, gameState, handleBet, playGame, resetGame } = useContext(AppContext);

  const btnDisabled = () => {
    const sumBet = Object.values(cardBets).reduce((acc, cum) => acc + cum);
    return sumBet === 0;
  };

  const cardBetToBeHidden = Object.entries(cardBets).filter(([, value]) => value === 0)

  return (
    <div className="flex flex-col flex-1">
      <div className="flex gap-x-5 justify-center items-center">
        {Object.entries(cardBets).map((data) => {
          return <Card
            key={data[0]}
            type={data[0] as CardType}
            amount={data[1]}
            handleBet={handleBet}
            hideBet={cardBetToBeHidden.length === 1 && cardBetToBeHidden[0][0] === data[0]}
          />
        })}
      </div>
      <button
        disabled={btnDisabled()}
        onClick={gameState === GameState.START ? playGame : resetGame}
        className="w-40 h-16 mx-auto mt-10 bg-[#070707] uppercase font-semibold text-2xl text-[#9e8b68] border-2 border-[#9e8b68] rounded-full disabled:text-[#9e8b68]/50 disabled:border-[#9e8b68]/50"
      >
        {gameState === GameState.START ? 'Play' : 'Clear'}
      </button>
    </div>
  );
};

export default Betting;
