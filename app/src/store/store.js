import { configureStore } from "@reduxjs/toolkit";
import BoardsReducer from "../slices/BoardsSlice";
import modalReducer from "../slices/ModalSlice";

export const store = configureStore({
  reducer: {
    boards: BoardsReducer,
    modal: modalReducer,
  },
});