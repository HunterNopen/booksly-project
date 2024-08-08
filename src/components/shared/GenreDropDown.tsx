import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  genres: string[];
};

const GenreDropDown: React.FC<Props> = ({ genres }) => {
  const navigate = useNavigate();

  const handleSelect = (genre: string) => {
    navigate(`/library/${genre}`);
  };

  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Choose your genre!
      </a>
      <ul className="dropdown-menu">
      {genres.map((genre) => (
          <li key={genre}>
            <a className="dropdown-item" onClick={() => handleSelect(genre)}>
                {genre}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GenreDropDown;
