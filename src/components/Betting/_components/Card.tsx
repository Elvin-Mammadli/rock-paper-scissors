import React from "react";
import { CardType } from "@/types";

type Props = {
  type: CardType;
  amount: number;
  handleBet: (operator: "+" | "-", cardType: CardType) => void;
  hideBet: boolean;
  isWonCard: boolean;
};

const colors = {
  rock: {
    bg: "#211f4f",
    border: "#2e4270",
    text: "#2680ea",
  },
  paper: {
    bg: "#1a381d",
    border: "#187e3a",
    text: "#15c158",
  },
  scissors: {
    bg: "#50091e",
    border: "#8c112f",
    text: "#dd1440",
  },
};

const Card: React.FC<Props> = ({
  type,
  amount,
  handleBet,
  hideBet,
  isWonCard = false,
}) => {
  return (
    <div
      className="w-40 h-28 flex flex-col gap-y-2 justify-center items-center rounded-md cursor-pointer"
      style={{
        backgroundColor: colors[type].bg,
        border: `${isWonCard ? "6px" : "3px"} ${colors[type].border} solid`,
      }}
    >
      <div className="h-8">
        {hideBet ? null : (
          <div className="group h-full px-1 flex items-center gap-x-1 text-sm leading-none font-semibold bg-white rounded-full border-[3px] border-blue-500 cursor-default">
            <button
              className="hidden group-hover:block"
              onClick={() => handleBet("-", type)}
            >
              -
            </button>
            {amount}
            <button
              className="hidden group-hover:block"
              onClick={() => handleBet("+", type)}
            >
              +
            </button>
          </div>
        )}
      </div>
      <span
        className="font-semibold uppercase"
        style={{
          color: colors[type].text,
        }}
      >
        {type}
      </span>
    </div>
  );
};

export default Card;
