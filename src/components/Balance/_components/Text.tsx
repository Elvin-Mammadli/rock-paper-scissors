import React from "react";

type Props = {
  label: string;
  amount: number;
};

const Text: React.FC<Props> = ({ label, amount }) => {
  return (
    <div className="">
      <span className="text-yellow-500 font-medium">{label}: </span>
      <span className="text-white">{amount}</span>
    </div>
  );
};

export default Text;
