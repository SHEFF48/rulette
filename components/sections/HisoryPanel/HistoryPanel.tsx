"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { BetType } from "@/types/bets";

import BetCard from "@/components/custom/BetCard/BetCard";

const HistoryPannel = () => {
  const history = useSelector((state: RootState) => state.roulette.history);
  const displayedHistory = [...history].reverse();
  const last20 = displayedHistory.slice(0, 15);
  const countByType = history.reduce(
    (acc, curr) => {
      acc[curr]++;
      return acc;
    },
    {
      red: 0,
      green: 0,
      black: 0,
      jocker: 0,
    } as Record<BetType, number>
  );

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="flex flex-wrap gap-1 h-8">
        {last20.map((color, i) => (
          <BetCard key={i} betType={color} size="sm" />
        ))}
      </div>

      <div className="flex justify-end items-center justify-items-center gap-2">
        <h3 className="text-sm font-bold text-[#FCFFFE]/40">LAST 100</h3>
        <ul className="grid grid-cols-4 items-center gap-4 text-sm  text-white font-bold">
          <li className="flex items-center justify-center gap-2">
            <BetCard betType={"red"} size="xs" /> {countByType.red}
          </li>
          <li className="flex items-center justify-center gap-2">
            <BetCard betType={"black"} size="xs" /> {countByType.black}
          </li>
          <li className="flex items-center justify-center gap-2">
            <BetCard betType={"green"} size="xs" /> {countByType.green}
          </li>
          <li className="flex items-center justify-center gap-2">
            <BetCard betType={"jocker"} size="xs" /> {countByType.jocker}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HistoryPannel;
