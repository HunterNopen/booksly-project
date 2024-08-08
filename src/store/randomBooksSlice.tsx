import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Book } from '../types/types';
import { getBookStatus, saveBookStatus } from './localStorage';

export interface RandomBooksState {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  totalBooks: number;
}

const initialState: RandomBooksState = {
  books: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalBooks: 0,
};

export const fetchBooksByPage = createAsyncThunk<Book[], number>(
  'books/fetchBooksByPage',
  async (pageNumber) => {
    const booksPerPage = 4;
    const response = await fetch(`https://openlibrary.org/search.json?q=random&limit=${booksPerPage}&page=${pageNumber}`);
    const data = await response.json();
    return data.docs;
  }
);

const randomBooksSlice = createSlice({
  name: 'randomBooks',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload.map((book) => ({
        ...book,
        status: getBookStatus(book.isbn[0].toString()) || null,
      }));
    },
    updateBookStatus(state, action: PayloadAction<{ isbn: string; status: string }>) {
      const { isbn, status } = action.payload;
      const book = state.books.find((b) => b.isbn[0].toString() === isbn);
      if (book) {
        book.status = status;
        saveBookStatus(isbn, status);
      }
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksByPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooksByPage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooksByPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export const { setCurrentPage, updateBookStatus } = randomBooksSlice.actions;

export default randomBooksSlice.reducer;

export const selectRandomBooks = (state: RootState) => state.randomBooks.books;
export const selectRandomBooksStatus = (state: RootState) => state.randomBooks.status;
export const selectRandomBooksError = (state: RootState) => state.randomBooks.error;
export const selectCurrentPage = (state: RootState) => state.randomBooks.currentPage;
