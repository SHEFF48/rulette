// "use client";

import { generateRandomBets, groupBetsByType } from "@/lib/bets";
import { colorClassMap } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { Bet, BetType } from "@/types/bets";
import Image from "next/image";
import React, { FC } from "react";

interface IBetsCard {
  title: string;
  description: string;
  bets: Bet[];
  betType: BetType;
}
const BetsCard: FC<IBetsCard> = ({ title, description, bets, betType }) => (
  <div className="flex flex-col items-center justify-start gap-3 w-full relative">
    <header
      className={cn(
        "flex justify-between items-center w-full px-3 py-4 text-white text-[14px] font-bold uppercase rounded-md overflow-hidden relative"
        // `${colorClassMap[betType]}`
      )}
    >
      <div className="title z-10">{title}</div>
      <div className="description z-10">{description}</div>
      <div
        className={cn(
          "absolute w-full h-[100%] rounded-md bottom-0 left-0 right-0 opacity-85",
          betType && ` ${colorClassMap[betType]}`
        )}
      ></div>

      <div
        className={cn(
          "absolute w-full h-[95%] rounded-md bottom-0 left-0 right-0 ",
          betType && ` ${colorClassMap[betType]}`
        )}
      ></div>
    </header>
    <div className="total flex justify-between items-center px-3 w-full text-white/80 font-semibold">
      <div className="title">
        {bets.length} {"Bets total"}
      </div>
      <div className="total-amount flex items-center justify-end gap-2">
        <Image
          src={"/icons/chip_icon.svg"}
          width={20}
          height={20}
          alt="chip_icon"
        />
        <div className="amount">
          {bets.reduce((prev, current) => prev + current.amount, 0).toFixed(2)}
        </div>
      </div>
    </div>
    <div className="flex flex-col w-full bg-[#23262C] rounded-md overflow-hidden">
      {bets.length > 0 &&
        bets.map((bet, index) => {
          return (
            <div
              key={bet.id}
              className={cn(
                "grid grid-cols-2 w-full p-3 pl-9 text-white/80 font-semibold",
                index === 3 && " bg-[#2d323c]"
              )}
            >
              <div className="user flex items-center justify-start gap-1.5">
                <div className="icon">
                  <Image
                    src={"/icons/user_icon.svg"}
                    width={16}
                    height={16}
                    alt="user_icon"
                  />
                </div>
                <div className="user-name">{bet.user}</div>
              </div>
              <div className="bet-amount flex items-center justify-end gap-2">
                <div className="icon">
                  <Image
                    src={"/icons/chip_icon.svg"}
                    width={20}
                    height={20}
                    alt="chip_icon"
                  />
                </div>
                <div className="amount">{bet.amount}</div>
              </div>
            </div>
          );
        })}
    </div>
  </div>
);

const BetsTable: FC = () => {
  const bets = generateRandomBets(60);
  const {
    green: betsOnGreen,
    red: betsOnRed,
    black: betsOnBlack,
    jocker: betsOnJocker,
  } = groupBetsByType(bets);
  return (
    <section className="grid grid-cols-4 gap-4 w-full">
      <BetsCard
        title="bet on red"
        description="pays 14x"
        bets={betsOnRed}
        betType="red"
      />
      <BetsCard
        title="bet on green"
        description="pays 14x"
        bets={betsOnGreen}
        betType="green"
      />
      <BetsCard
        title="bet on black"
        description="pays 14x"
        bets={betsOnBlack}
        betType="black"
      />
      <BetsCard
        title="bet on joker"
        description="pays 14x"
        bets={betsOnJocker}
        betType="jocker"
      />
    </section>
  );
};

export default BetsTable;
