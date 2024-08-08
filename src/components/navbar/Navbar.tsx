import React, { useEffect, useState } from "react";
import logo from '../../assets/logo.png';
import { NavbarItem } from "../../types/types";
import { NavLink, useNavigate } from "react-router-dom";
import GenreDropDown from "../shared/GenreDropDown";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const navigation: NavbarItem[] = [
    {
      name: "Home",
      href: ""
    },
    {
      name: "Random 100",
      href: "random"
    },
    {
      name: "Bookmarked",
      href: "bookmarked"
    },
    {
      name: "NotFoundTest",
      href: "abrakdabra"
    }
  ]

  useEffect(() => {
    if(searchInput){
      navigate(`/search?input=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
        <div className="container-fluid">
        <img src={logo} className="img-fluid" style={{maxWidth: 200, maxHeight: 100}}/>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              {
                navigation.map((nav, index) => {
                  return(
                    <li className="nav-item" key={index}>
                      <NavLink key={nav.name + index} to={nav.href} className="nav-link">
                        {nav.name}
                      </NavLink>
                    </li>
                )})
              }
              <li className="nav-item dropdown">
              <GenreDropDown genres={["action", "horror", "fantasy"]} />
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchInput(e.target.value)}
                value = {searchInput}
              />
              <button className="btn btn-outline-warning" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
