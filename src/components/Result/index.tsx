import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { BetResult } from "../../types/types";

type Props = {};

const Result: React.FC<Props> = (props) => {
  const { betResult, wonCard } = useContext(AppContext);

  // const showBetResult = (result: BetResult) => {
  //   if (result === BetResult.START) {
  //     return <span className='mt-auto mb-5 uppercase text-yellow-500 font-medium'>Pick your positions</span>
  //   } else {
  //     return <div className="flex flex-col justify-center items-center gap-y-1">
  //       <span className="uppercase text-green-400 font-semibold text-3xl">
  //         {result === BetResult.WON ? wonCard + ' won' : result === BetResult.LOST ? 'lost' : result === BetResult.TIE :
  //       </span>
  //       <span className="uppercase text-yellow-500 font-medium">
  //         you win <span className="text-white/90">555.55</span>
  //       </span>
  //     </div>

  //   }
  // }

  return (
    <div className="flex flex-1 justify-center">
      {/* <span className='text-white text-7xl my-auto'>ROCK <span className='text-yellow-600 mx-6'>vs</span> Paper</span> */}
    </div>
  );
};

export default Result;
