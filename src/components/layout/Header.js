import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const links = [
  { path: '/', text: 'Home', icon: 'fas fa-home' },
  { path: '/about', text: 'About', icon: 'fas fa-plus' },
  { path: '/contact/add', text: 'Add Contact', icon: 'fas fa-question' }
]
const Header = ({ branding }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            {links.map(link => (
              <li className="nav-item" key={link.text}>
                <Link className="nav-link" to={link.path}>
                  <i className={link.icon} /> {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
Header.defaultProps = {
  branding: 'My App'
}

Header.propTypes = {
  branding: PropTypes.string.isRequired
}

export default Header
