import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Navbar({setSearch}) {
    const searchHandler = (event) => {
        event.preventDefault();
      };

  return (
    <div>
       <nav id="navbar" className="navbar navbar-light ">
          <div className="container-fluid">
            <h1 className="navbar-brand">KANBAN</h1>
            <NavLink to={"/newtask"}>
              <button id="create-btn">Create Task</button>
            </NavLink>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="search-btn"
                onClick={searchHandler}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
    </div>
  )
}
