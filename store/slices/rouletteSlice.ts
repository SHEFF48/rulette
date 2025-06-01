import { BetType } from "@/types/bets";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouletteState {
  history: BetType[]; // последние 100 результатов
}

const initialState: RouletteState = {
  history: [],
};

export const rouletteSlice = createSlice({
  name: "roulette",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<BetType>) => {
      state.history.push(action.payload); // эффективно добавляем в конец
      if (state.history.length > 100) {
        state.history.shift(); // удаляем первый (самый старый)
      }
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addResult, clearHistory } = rouletteSlice.actions;
export default rouletteSlice.reducer;
