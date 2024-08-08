import React, { useEffect, useState } from 'react'
import { Book } from '../types/types';
import { getAllBookStatuses } from '../store/localStorage';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Bookmarked = () => {
  const [books, setBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    const bookStatuses = getAllBookStatuses();
    const fetchBookDetails = async () => {
      const bookPromises = Object.keys(bookStatuses).map(async (isbn) => {
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        const data = await response.json();
        const bookData = data[`ISBN:${isbn}`];
        return {
          title: bookData.title,
          author_name: bookData.authors.map((author: any) => author.name),
          isbn: [Number.parseInt(isbn)],
          status: bookStatuses[isbn]
        };
      });
      
      const books = await Promise.all(bookPromises);
      setBooks(books);
    };

    fetchBookDetails();
  }, []);

  const getBookCover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  const groupedBooks = books.reduce((acc, book) => {
    if (!acc[book.status!]) {
      acc[book.status!] = [];
    }
    acc[book.status!].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  return (
    <Container className='text-light'>
      <h1 className="text-center my-4">Bookmarked Books</h1>
      {Object.keys(groupedBooks).map((status) => (
        <div key={status}>
          <h2>{status}</h2>
          <Row>
            {groupedBooks[status].map((book, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={getBookCover(book.isbn[0].toString())} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      {book.author_name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default Bookmarked