import React from 'react'
import { Link } from 'react-router-dom'


export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Users Track</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Users</Link>
            <Link to="/connections">Connections</Link>
            <Link to="/friends">Search friends</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
