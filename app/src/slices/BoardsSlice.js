import { createSlice } from "@reduxjs/toolkit";
import { initialValue } from "./initialValue";
import { nanoid } from "@reduxjs/toolkit";

const BoardsSlice = createSlice({
  name: "boards",
  initialState: initialValue,
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const { id, name } = action.payload;
      const board = {
        id,
        name: name,
        isActive,
        columns: [
          { name: "todo", tasks: [], id: nanoid() },
          { name: "in progress", tasks: [], id: nanoid() },
          { name: "done", tasks: [], id: nanoid() },
        ],
      };
      state.boards.push(board);
    },

    editBoard: (state, action) => {
      const { name } = action.payload;
      const board = state.boards.find((board) => board.isActive);
      board.name = name;
    },

    deleteBoard: (state) => {
      const board = state.boards.find((board) => board.isActive);
      state.boards.splice(state.boards.indexOf(board), 1);
    },

    setBoardActive: (state, action) => {
      state.boards.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },

    addTask: (state, action) => {
      const { title, description, status, timeLimit } = action.payload;
      const id = nanoid();
      const date = new Date().toLocaleString();
      const limit = new Date(timeLimit).toLocaleString();
      const task = { id, title, date, description, status, limit };
      const board = state.boards.find((board) => board.isActive);
      const column = board.columns.find((column) => column.name === status);
      column.tasks.push(task);
    },

    editTask: (state, action) => {
      const {
        id,
        title,
        status,
        description,
        limit
      } = action.payload;

      const board = state.boards.find((board) => board.isActive);
      const column = board.columns.find((column) => column.name === status);
      const task = column.tasks.find((task) => task.id === id);
      task.title = title;
      // task.status = status;
      task.description = description;
      task.limit = limit;
      // if (prevColIndex === newColIndex) return;
      // column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      // const newCol = board.columns.find((col, index) => index === newColIndex);
      // newCol.tasks.push(task);
    },

    dragTask: (state, action) => {
      const { colId, prevColIndex, taskIndex } = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      const newColumn = board.columns.find((col, i) => i === colId);
      task.status = newColumn.name;
      newColumn.tasks.push(task);
    },

    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },

    deleteTask: (state, action) => {
      const { id, status } = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const column = board.columns.find((column) => column.name === status);
      column.tasks = column.tasks.filter((task) => task.id !== id);
    },
  },
});

export const { addBoard, editBoard, deleteBoard, setBoardActive, addTask, editTask, deleteTask, dragTask } =
  BoardsSlice.actions;
export default BoardsSlice.reducer;