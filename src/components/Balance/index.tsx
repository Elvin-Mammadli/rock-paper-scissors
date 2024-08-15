import React, { useContext } from "react";
import Text from "./_components/Text";
import { AppContext } from "../../context/AppContext";

const Balance: React.FC = () => {
  const state = useContext(AppContext);
  const { balanceStats, cardBets } = state;

  // console.log(balanceStats, cardBets);

  return (
    <header>
      <div className="h-8 flex justify-center items-center gap-x-16 bg-neutral-950">
        {Object.entries(balanceStats).map((data) => (
          <Text key={data[0]} label={data[0]} amount={data[1]} />
        ))}
      </div>
    </header>
  );
};

export default Balance;
