import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteOperationsStore } from "src/store/favorite-operations/types";

const initialState: FavoriteOperationsStore = {
    operations: [],
    selectedOperation: null,
};

export const operationHistorySlice = createSlice({
    name: "favoriteOperations",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            state.operations.push(action.payload);
        },
        setSelected: (state, action: PayloadAction<string>) => {
            state.selectedOperation = action.payload;
        },
        clearSelected: (state) => {
            state.selectedOperation = null;
        },
    },
});

export const { addFavorite, setSelected, clearSelected } = operationHistorySlice.actions;

export default operationHistorySlice.reducer;
