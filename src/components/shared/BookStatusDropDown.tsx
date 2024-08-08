import React from 'react';
import { useDispatch } from 'react-redux';
import { updateBookStatus } from '../../store/randomBooksSlice';
import { Dropdown } from 'react-bootstrap';

interface BookStatusDropdownProps {
  isbn: string;
  currentStatus: string | null;
}

const BookStatusDropdown: React.FC<BookStatusDropdownProps> = ({ isbn, currentStatus }) => {
  const dispatch = useDispatch();

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      dispatch(updateBookStatus({ isbn, status: eventKey }));
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {currentStatus || 'Set Status'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Plan to Read">Plan to Read</Dropdown.Item>
        <Dropdown.Item eventKey="Reading">Reading</Dropdown.Item>
        <Dropdown.Item eventKey="Finished">Finished</Dropdown.Item>
        <Dropdown.Item eventKey="None">None</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default BookStatusDropdown;
