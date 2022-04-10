import { RootState } from "src/store/index";

export const selectFavoriteOperations = (state: RootState) => state.favoriteOperations.operations;
export const selectSelectedFavoriteOperation = (state: RootState) => state.favoriteOperations.selectedOperation;
