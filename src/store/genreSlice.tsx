import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Book } from "../types/types";
import { getBookStatus, saveBookStatus } from "./localStorage";
import { RootState } from "./store";

export interface BooksState {
    books: Book[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number;
    totalBooks: number;
  }

const initialState: {selectedGenre: string, booksState: BooksState} = {
    selectedGenre: '',
    booksState: {
    books: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalBooks: 0,
    }
}

export const fetchBooksByPage = createAsyncThunk<Book[], {page: number, genre: string}>(
    'books/fetchBooksByPage',
    async ({page, genre}) => {
      const booksPerPage = 4;
      console.log(`https://openlibrary.org/search.json?subject=${genre}&limit=${booksPerPage}&page=${page}`);
      const response = await fetch(`https://openlibrary.org/search.json?subject=${genre}&limit=${booksPerPage}&page=${page}`);
      const data = await response.json();
      return data.docs;
    }
  );

const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setSelectedGenre(state, action: PayloadAction<string>){
            state.selectedGenre = action.payload;
        },
        setBooks(state, action: PayloadAction<Book[]>) {
            state.booksState.books = action.payload.map((book) => ({
              ...book,
              status: getBookStatus(book.isbn[0].toString()) || null,
            }));
          },
          updateBookStatus(state, action: PayloadAction<{ isbn: string; status: string }>) {
            const { isbn, status } = action.payload;
            const book = state.booksState.books.find((b) => b.isbn[0].toString() === isbn);
            if (book) {
              book.status = status;
              saveBookStatus(isbn, status);
            }
          },
          setCurrentPage(state, action) {
            state.booksState.currentPage = action.payload;
          },
        },
        extraReducers: (builder) => {
          builder
            .addCase(fetchBooksByPage.pending, (state) => {
              state.booksState.status = 'loading';
            })
            .addCase(fetchBooksByPage.fulfilled, (state, action) => {
              state.booksState.status = 'succeeded';
              state.booksState.books = action.payload;
            })
            .addCase(fetchBooksByPage.rejected, (state, action) => {
              state.booksState.status = 'failed';
              state.booksState.error = action.error.message || 'Failed to fetch books';
            });
        },
});

export const { setSelectedGenre, setCurrentPage, updateBookStatus } = genreSlice.actions;

export const selectRandomBooks = (state: RootState) => state.genreBooks.booksState.books;
export const selectRandomBooksStatus = (state: RootState) => state.genreBooks.booksState.status;
export const selectRandomBooksError = (state: RootState) => state.genreBooks.booksState.error;
export const selectCurrentPage = (state: RootState) => state.genreBooks.booksState.currentPage;

export default genreSlice.reducer;