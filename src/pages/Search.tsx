import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Row, Col, Card } from 'react-bootstrap';
import { useLazyGetBookByNameQuery, useLazyGetBookByAuthorQuery, useLazyGetBookByYearQuery } from '../store/bookApiSetup';
import { useSearchParams } from 'react-router-dom';
import { Book } from '../types/types';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('input') || '';
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [triggerSearchByTitle] = useLazyGetBookByNameQuery();
  const [triggerSearchByAuthor] = useLazyGetBookByAuthorQuery();
  const [triggerSearchByYear] = useLazyGetBookByYearQuery();

  useEffect(() => {
    const searchBooks = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);
      setBooks([]);

      try {
        let result = await triggerSearchByTitle(query).unwrap();
        if (result.docs.length === 0) {
          result = await triggerSearchByAuthor(query).unwrap();
          if (result.docs.length === 0) {
            result = await triggerSearchByYear(query).unwrap();
          }
        }
        setBooks(result.docs.slice(0, 4));
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    searchBooks();
  }, [query, triggerSearchByTitle, triggerSearchByAuthor, triggerSearchByYear]);

  const getBookCover = (isbn: string) => {
    if (isbn) {
      return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    }
    return 'https://via.placeholder.com/150'; // Fallback image for missing ISBNs
  };

  return (
    <Container>
      <h1 className="text-center my-4">Search Results</h1>
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && books.length === 0 && (
        <Alert variant="info">No results found for "{query}".</Alert>
      )}
      {!loading && !error && books.length > 0 && (
        <Row>
          {books.map((book, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={getBookCover(book.isbn?.[0].toString() ?? '')} />
                <Card.Body>
                  <Card.Title>{book.title || 'Untitled'}</Card.Title>
                  <Card.Text>
                    {book.author_name || 'Unknown Author'}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Search;
