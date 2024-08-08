import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BookStatusDropdown from "../components/shared/BookStatusDropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  selectRandomBooks,
  selectRandomBooksStatus,
  selectRandomBooksError,
  selectCurrentPage,
  fetchBooksByPage,
  setCurrentPage,
} from "../store/genreSlice";

const validGenres = ['action', 'horror', 'fantasy'];

const Library: React.FC = () => {
  const { genreName } = useParams<{ genreName: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectRandomBooks);
  const status = useSelector(selectRandomBooksStatus);
  const error = useSelector(selectRandomBooksError);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(fetchBooksByPage({page: currentPage, genre: genreName!}));
    if (!validGenres.includes(genreName!)) {
        navigate("/501");
      }
  }, [currentPage, dispatch, genreName]);

  const getBookCover = (isbn: string) =>
    `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
    }

    return (
      <div className="text-light">
        <Container>
          <h1 className="text-center my-4">
            {genreName?.toUpperCase()} Books (Page {currentPage})
          </h1>
          <div className="d-flex justify-content-between my-4">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button onClick={handleNextPage}>Next</Button>
          </div>
          {status === "loading" && (
            <Spinner animation="border" variant="primary" />
          )}
          {status === "failed" && (
            <div className="alert alert-danger">{error}</div>
          )}
          {status === "succeeded" && (
            <>
              <Row>
                {books.map((book, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card>
                      <Card.Img
                        variant="top"
                        src={getBookCover(book.isbn[0].toString())}
                      />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>{book.author_name}</Card.Text>
                        <BookStatusDropdown
                          isbn={book.isbn[0].toString()}
                          currentStatus={book.status}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </div>
    );
};

export default Library;
