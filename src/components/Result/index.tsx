import React from "react";

type Props = {};

const Result: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-1 justify-center">
      {/* <span className='text-white text-7xl my-auto'>ROCK <span className='text-yellow-600 mx-6'>vs</span> Paper</span> */}
      {/* <span className='mt-auto mb-5 uppercase text-yellow-500 font-medium'>Pick your positions</span> */}
      <div className="flex flex-col justify-center items-center gap-y-1">
        <span className="uppercase text-green-400 font-semibold text-3xl">
          Paper won
        </span>
        <span className="uppercase text-yellow-500 font-medium">
          you win <span className="text-white/90">555.55</span>
        </span>
      </div>
    </div>
  );
};

export default Result;
