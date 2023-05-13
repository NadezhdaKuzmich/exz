import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice/AuthSlise";
import BoardsReducer from "../slices/BoardSlice/BoardsSlice";
import modalReducer from "../slices/ModalSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    boards: BoardsReducer,
    modal: modalReducer,
  },
});