import { createSlice, current } from "@reduxjs/toolkit";
import { initialValue } from "./initialValue";
import { nanoid } from "@reduxjs/toolkit";

const BoardsSlice = createSlice({
  name: "boards",
  initialState: initialValue,
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const { id, name, author } = action.payload;
      const board = {
        id,
        name: name,
        isActive,
        author,
        columns: [
          { name: "todo", tasks: [], id: nanoid() },
          { name: "in progress", tasks: [], id: nanoid() },
          { name: "done", tasks: [], id: nanoid() },
          { name: "overdue", tasks: [], id: nanoid() },
        ],
      };
      state.boards.push(board);
    },

    editBoard: (state, action) => {
      const { name } = action.payload;
      const board = state.boards.find((board) => board.isActive);
      board.name = name;
    },

    deleteBoard: (state, action) => {
      const { index } = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const indexBoard = state.boards.indexOf(board);
      state.boards.splice(indexBoard, 1);
      if (index !== 0) {
        const prevIndex = index - 1;
        state.boards.map((board, index) => {
          index === prevIndex
            ? (board.isActive = true)
            : (board.isActive = false);
          return board;
        });
      } else {
        state.boards.map((board, index) => {
          index === 0 ? (board.isActive = true) : (board.isActive = false);
          return board;
        });
      }
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
      const { title, description, statusName, timeLimit, responsible } =
        action.payload;
      let status = statusName;
      const id = nanoid();
      const date = new Date().toString();
      const limit = new Date(timeLimit).toString();
      const visible = true;
      if (Date.parse(limit) < new Date()) {
        status = "overdue";
      }
      const task = {
        id,
        title,
        date,
        description,
        status,
        limit,
        responsible,
        visible,
      };
      const board = state.boards.find((board) => board.isActive);
      const column = board.columns.find((column) => column.name === status);
      column.tasks.push(task);
    },

    editTask: (state, action) => {
      const { id, title, prevStatus, status, description, responsible, limit } =
        action.payload;
      const board = state.boards.find((board) => board.isActive);
      const column = board.columns.find((column) => column.name === prevStatus);
      const task = column.tasks.find((task) => task.id === id);
      task.title = title;
      task.status = status;
      task.responsible = responsible;
      task.description = description;
      task.limit = limit;
      if (prevStatus === status) return;
      column.tasks = column.tasks.filter((task) => task.id !== id);
      console.log(prevStatus, status);
      const newCol = board.columns.find((column) => column.name === status);
      newCol.tasks.push(task);
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

    findOverdueTask: (state, action) => {
      const { filtered } = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const overdueCol = board.columns.find(
        (column) => column.name === "overdue"
      );
      filtered.forEach((task) => {
        const column = board.columns.find(
          (column) => column.id === task.column
        );
        const taskOverdue = column.tasks.splice(task.taskIndex, 1)[0];
        taskOverdue.status = "overdue";
        overdueCol.tasks.push(taskOverdue);
      });
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

    searchTask: (state, action) => {
      const { searchCol, titleSearch } = action.payload;
      const board = state.boards.find((board) => board.isActive);
      const col = board.columns.find((column) => column.id === searchCol);
      const filtered = col.tasks.map((task) =>
        task.title.toLowerCase().includes(titleSearch.toLowerCase())
          ? { ...task, visible: true }
          : { ...task, visible: false }
      );
      col.tasks = filtered;
    },

    rangeDateTask: (state, action) => {
      const { searchCol, startDate, endDate } = action.payload;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const board = state.boards.find((board) => board.isActive);
      const col = board.columns.find((column) => column.id === searchCol);
      console.log(start, end);
      const filtered = col.tasks.map((task) =>
        (new Date(task.date) >= start && new Date(task.date) <= end) ||
        new Date(task.date).toLocaleDateString() === start.toLocaleDateString()
          ? { ...task, visible: true }
          : { ...task, visible: false }
      );
      col.tasks = filtered;
    },
  },
});

export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  deleteTask,
  dragTask,
  findOverdueTask,
  searchTask,
  rangeDateTask,
} = BoardsSlice.actions;
export default BoardsSlice.reducer;
