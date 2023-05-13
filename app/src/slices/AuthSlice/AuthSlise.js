import { createSlice, current } from "@reduxjs/toolkit";

const initialUser = {
  username: localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null,
  password: localStorage.getItem("password")
  ? JSON.parse(localStorage.getItem("password"))
  : null
}

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    authUsers: [
      {
        username: "admin",
        email: "k.nadiia@gmail.com",
        password: "12345678",
      },
    ],
    userList: [
      {
        username: "Mykhailo Avdeenko",
      },
      {
        username: "Olena Boiko",
      },
      {
        username: "Pavlo Vashchenko",
      },
      {
        username: "Maksym Hlushko",
      },
      {
        username: "Marichka Demydenko",
      },      
    ]
  },
  reducers: {
    register: (state, action) => {
      const { username, email, password } = action.payload;
      const user = { username, email, password };
      state.authUsers.push(user);
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(username));
      localStorage.setItem("password", JSON.stringify(password));
    },

    login: (state, action) => {
      const { username, password } = action.payload;
      if (state.authUsers.length !== 0) {
        const user = state.authUsers.find((user) => user.username === username);
        if (user && user.password === password) {
          localStorage.setItem("user", JSON.stringify(username));
          localStorage.setItem("password", JSON.stringify(password));
          state.user = action.payload;
        } else {
          console.log("no");
          console.log(current(state.authUsers));
        }
      }
    },

    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("password");
      state.user = false;
    },
  },
});

export default authSlice.reducer;
export const { login, logout, register } = authSlice.actions;
