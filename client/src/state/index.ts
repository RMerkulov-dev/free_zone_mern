import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: any;
  name: string;
  email: string;
  friends: string[];
}
interface Comment {
  _id: any;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
}
interface CommentPayload {
  postId: string;
  comment: string;
}

interface AuthState {
  mode: "light" | "dark";
  user: User | null;
  token: string | null;
  posts: any[];
}

const initialState: AuthState = {
  mode: "light",
  user: null,
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
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action: PayloadAction<{ friends: string[] }>) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends is non-existent:(");
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: any[] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<{ post: any }>) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
    },
    addComment: (state, action: PayloadAction<CommentPayload>) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.postId
      );
      if (postIndex !== -1) {
        state.posts[postIndex].comments.push(action.payload.comment);
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  addComment,
} = authSlice.actions;
export default authSlice.reducer;
