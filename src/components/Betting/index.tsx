import { useContext } from "react";
import Card from "./_components/Card";
import { AppContext } from "../../context/AppContext";

const Betting: React.FC = () => {
  const { playGame, cardBets, handleBet } = useContext(AppContext);

  const btnDisabled = () => {
    const sumBet = Object.values(cardBets).reduce((acc, cum) => acc + cum);
    return sumBet === 0;
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex gap-x-5 justify-center items-center">
        {Object.entries(cardBets).map((data) => (
          <Card
            key={data[0]}
            type={data[0] as "scissors" | "rock" | "paper"}
            amount={data[1]}
            handleBet={handleBet}
          />
        ))}
      </div>
      <button
        disabled={btnDisabled()}
        onClick={playGame}
        className="w-40 h-16 mx-auto mt-10 bg-[#070707] uppercase font-semibold text-2xl text-[#9e8b68] border-2 border-[#9e8b68] rounded-full disabled:text-[#9e8b68]/50 disabled:border-[#9e8b68]/50"
      >
        Play
      </button>
    </div>
  );
};

export default Betting;
