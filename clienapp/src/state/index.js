import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  mode: "light",
  user: {
    friends: [],
  },
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("Authorization", action.payload.token, { expires: 7 });
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("Authorization");
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      if (Array.isArray(action.payload.posts)) {
        state.posts = action.payload.posts;
      } else {
        console.error("Posts payload is not an array.");
      }
    },
    setPost: (state, action) => {
      if (state.posts.length > 0) {
        const updatedPosts = state.posts.map((post) =>
          post._id === action.payload.post._id ? action.payload.post : post
        );
        state.posts = updatedPosts;
      }
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
