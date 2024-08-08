# Booksly Overview
Booksly is a React application built with TypeScript that allows users to search for books using the Open Library API, bookmark books with different statuses (Plan to Read, Reading, Finished), and paginate through a list of popular books. This project leverages Redux for state management and React-Bootstrap for the UI components.

This is pure API project -> no db, the temp data is stored in localStroage with jwt token access.

### Technologies used:
- React + TS
- Redux, Custom Hooks, StateManagement, Redux-Toolkit
- React Router Dom
- Bootstrap => `Not a perfect design, I was trying to focus on func, so dont blame me for ui/ux bugs & errors`
- API: openlibrary.org

### Components and Functionality

- Home - gets most popular books of the week
- Random 100 - gets 100 random books in rating order
- Bookmarked - each book could get a status (plan/reading/finished etc), which is saved in local storage. This page shows them
- Search - dynamically search books based on input! Searches firstly by name, if there is no books found => searches by author => then by year
- Genre - choose your genre and fetch the books
- NotFoundTest - just in case
- Maybe there is more, but at a time I forgot :/

### Features

* Search Functionality: Search books by title, author, or year with a cascading search approach.
* Bookmarking: Users can bookmark books with different statuses (Plan to Read, Reading, Finished) and manage them.
* Pagination: Paginate through popular books, fetching 4 books per page.
* Responsive UI: Built with React-Bootstrap for a modern, responsive design.

P.S> In future, might finish rating bar, but at a moment too lazy as it would be similar as Bookmark Component

### API Integration
This project uses the Open Library API to fetch book data. The API is integrated with Redux using @reduxjs/toolkit's createApi and fetchBaseQuery.

Endpoints Used
- Search by Title: /search.json?title={title}
- Search by Author: /search.json?author={author}
- Search by Year: /search.json?year={year}
- Trending Books: Custom query to get a list of popular books

### Getting started

``` npm run ``` in root dir :/


## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
