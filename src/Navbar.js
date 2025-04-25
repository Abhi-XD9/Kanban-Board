import React from 'react'
import { NavLink } from 'react-router-dom';
import { useTasks } from './Components/Context';

export default function Navbar() {
  const {setSearch} = useTasks()

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
