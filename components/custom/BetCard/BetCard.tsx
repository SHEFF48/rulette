"use client";
import { colorClassMap } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { BetType } from "@/types/bets";
import Image from "next/image";
import React, { FC } from "react";

const BET_ICONS = {
  red: "/icons/card_dark_icon.svg",
  black: "/icons/card_light_icon.svg",
  green: "/icons/card_light_icon.svg",
  jocker: "/icons/card_jocker_icon.svg",
};

const BET_ICON_SIZES = {
  xs: { with: 15, height: 5 },
  sm: { with: 25, height: 10 },
  md: { with: 35, height: 15 },
  lg: { with: 55, height: 25 },
};

interface IBetCard {
  betType: BetType;
  size?: "xs" | "sm" | "md" | "lg";
}

const BetCard: FC<IBetCard> = ({ betType, size = "lg" }) => {
  return (
    <div
      className={cn(
        " flex items-center justify-center font-bold text-white text-sm rounded-md relative overflow-hidden  ",
        size === "xs" && "w-[24px] h-[24px] text-xs rounded-sm",
        size === "sm" && "w-[32px] h-[32px] text-xs rounded-sm",
        size === "md" && "w-[75px] h-[75px] text-sm",
        size === "lg" && "w-[100px] h-[100px] text-lg"
        // betType && `${colorClassMap[betType]}`
      )}
    >
      {/* {betType.toUpperCase()}
       */}
      <Image
        src={BET_ICONS[betType]}
        width={+BET_ICON_SIZES[size].with}
        height={+BET_ICON_SIZES[size].height}
        alt={"bet icon"}
        className="z-50"
      />

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
      {/* <div
        className="absolute top-0 left-0 right-0 h-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(255,255,255,0.4), transparent 70%)",
          clipPath: `polygon(
           
           75% 60%, 75% 100%, 
           25% 100%, 25% 60%, 
       
         )`,
        }}
      /> */}
    </div>
  );
};

export default BetCard;
