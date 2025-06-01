import { BetType } from "@/types/bets";

export const colorClassMap: Record<BetType, string> = {
  red: "bg-bet-red",
  green: "bg-bet-green",
  black: "bg-bet-black",
  jocker: "bg-bet-jocker",
};
