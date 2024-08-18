import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { GameState } from "../../types/types";

const Result: React.FC = () => {
  const { cardBets, gameResult, gameState } = useContext(AppContext);
  const [showResult, setShowResult] = useState<ReactNode>(<></>)


  console.log(gameResult)

  useEffect(() => {
    const { player_position_1, player_position_2, player_result_1, won_card_1, won_card_2 } = gameResult
    let timeout: ReturnType<typeof setTimeout>;

    if (gameState === GameState.END && won_card_1) {
      timeout = setTimeout(() => {
        setShowResult(
          <span className='text-white uppercase text-7xl my-auto'>
            {gameResult.computer}
            <span className='text-yellow-600 uppercase mx-6'> vs </span>
            {gameResult.player_position_1}
          </span>
        )
      }, 0)

      const showAmount = () => {
        let amount = 0;
        const winningMultiplier = player_position_2 ? 3 : 14;

        if (player_position_1 === '') return

        if (player_result_1 === 'won') {
          amount = cardBets[player_position_1] * winningMultiplier
        } else {
          amount = cardBets[player_position_1]
        }
        return amount
      }

      const showText = () => {
        let text = '';
        if (player_result_1 !== 'tie') {
          text = 'You ' + player_result_1
        } else {
          text = 'Bets returned to balance. '
        }
        return text;
      }

      timeout = setTimeout(() => {
        setShowResult(
          <div className="flex flex-col justify-center items-center gap-y-1" >
            <span className="uppercase text-green-400 font-semibold text-3xl">
              {won_card_1 !== 'tie' ? won_card_1 + ' won!' : 'It\'s tie'}
            </span>
            <span className="uppercase text-yellow-500 font-medium">
              {showText()}
              <span className="text-white/90"> {showAmount()}</span>
            </span>
          </div >
        )
      }, 2000)

      if (won_card_2) {
        timeout = setTimeout(() => {
          setShowResult(
            <span className='text-white uppercase text-7xl my-auto'>
              {gameResult.computer}
              <span className='text-yellow-600 uppercase mx-6'> vs </span>
              {gameResult.player_position_2}
            </span>
          )
        }, 4000)

        timeout = setTimeout(() => {
          setShowResult(
            <div className="flex flex-col justify-center items-center gap-y-1" >
              <span className="uppercase text-green-400 font-semibold text-3xl">
                {won_card_2 !== 'tie' ? won_card_2 + ' won!' : 'It\'s tie'}
              </span>
              <span className="uppercase text-yellow-500 font-medium">
                {showText()}
                <span className="text-white/90"> {showAmount()}</span>
              </span>
            </div >
          )
        }, 6000)
      }
    }

    return () => clearTimeout(timeout)
  }, [gameState])

  return (
    <div className="flex flex-1 justify-center">
      {gameState === GameState.START ? <span className='mt-auto mb-5 uppercase text-yellow-500 font-medium'>Pick your positions</span> : null}
      {gameState === GameState.START ? null : showResult}
    </div>
  );
};

export default Result;
