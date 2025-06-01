export type BetType = "red" | "green" | "black" | "jocker";

export interface Bet {
  id: string;
  user: string;
  type: BetType;
  amount: number;
}
