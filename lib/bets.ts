import { Bet, BetType } from "@/types/bets";

export function generateRandomBets(count: number): Bet[] {
  const betTypes: BetType[] = ["red", "green", "black", "jocker"];
  const users = ["Alice", "Bob", "Charlie", "Diana", "Eve"];

  return Array.from({ length: count }, (_, i) => {
    const type = betTypes[Math.floor(Math.random() * betTypes.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const amount = parseFloat((Math.random() * 100 + 0.1).toFixed(2));

    return {
      id: `bet-${i}-${Date.now()}`,
      user,
      type,
      amount,
    };
  });
}

export function groupBetsByType(bets: Bet[]): Record<BetType, Bet[]> {
  return bets.reduce(
    (acc, bet) => {
      if (!acc[bet.type]) {
        acc[bet.type] = [];
      }
      acc[bet.type].push(bet);
      return acc;
    },
    {
      red: [],
      green: [],
      black: [],
      jocker: [],
    } as Record<BetType, Bet[]>
  );
}
