import React, { useState } from 'react'
import { Book } from '../../types/types'
import { right } from '@popperjs/core';

type Props = {
    books: Book[]
}

const Banner: React.FC<Props> = ({ books }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    function getBookCover(id: number) :string{
        return `https://covers.openlibrary.org/b/isbn/${id}-L.jpg`;
     }

     const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
      };

      const currentBook = books[currentIndex];
      const currentBookCover = getBookCover(currentBook.isbn[0]);


      return (
        <div className="container text-light">
            <h3>{currentBook.title}</h3>
            <img src={currentBookCover} alt="Book cover" className='border-light m-2'/>
            {currentBook.first_sentence}
          <div className='container'>
            {currentBook.author_name}
          </div>
          <div className="navigation">
          <button type="button" className="btn btn-outline-warning" onClick={handlePrev}>Previous</button>
          <button type="button" className="btn btn-outline-warning" onClick={handleNext}>Next</button>
          </div>
        </div>
      );
    };

export default Banner