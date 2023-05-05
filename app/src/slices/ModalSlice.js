import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenAddBoard: false,
  isOpenBoardEdit:false,
  isOpenAddTask: false,
  isOpenDetailsTask: false,
  isOpenEditTask:false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,

  reducers: {
    toggleModal: (state, action) => {
      const { modal } = action.payload;
      state[modal] = !state[modal];
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;