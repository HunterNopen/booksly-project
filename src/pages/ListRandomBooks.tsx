import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Card, Container, Row, Col, Button } from 'react-bootstrap';
import { fetchBooksByPage, selectRandomBooks, selectRandomBooksStatus, selectRandomBooksError, selectCurrentPage, setCurrentPage } from '../store/randomBooksSlice';
import { AppDispatch } from '../store/store';
import BookStatusDropdown from '../components/shared/BookStatusDropDown';

const Random100Page: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const books = useSelector(selectRandomBooks);
  const status = useSelector(selectRandomBooksStatus);
  const error = useSelector(selectRandomBooksError);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(fetchBooksByPage(currentPage));
  }, [currentPage, dispatch]);

  const getBookCover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4 text-light">Random Books (Page {currentPage})</h1>
      <div className="d-flex justify-content-between my-4">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button onClick={handleNextPage}>Next</Button>
          </div>
      {status === 'loading' && <Spinner animation="border" variant="primary" />}
      {status === 'failed' && <div className="alert alert-danger">{error}</div>}
      {status === 'succeeded' && (
        <>
          <Row>
            {books.map((book, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={getBookCover(book.isbn[0].toString())} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      {book.author_name}
                    </Card.Text>
                    <BookStatusDropdown isbn={book.isbn[0].toString()} currentStatus={book.status} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Random100Page;
