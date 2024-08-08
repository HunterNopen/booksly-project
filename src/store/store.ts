import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./bookApiSetup";
import bookslyReducer from "./bookslySlice"
import randomBooksReducer from "./randomBooksSlice"
import genreBooksReducer from "./genreSlice"
 
export const store = configureStore({
 reducer: {
   [bookApi.reducerPath]: bookApi.reducer,
   bookslyData: bookslyReducer,
   randomBooks: randomBooksReducer,
   genreBooks: genreBooksReducer
 },

 middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(bookApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;