import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todo";

import crudReducer from './slice/crudSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    posts: crudReducer
  },
});
