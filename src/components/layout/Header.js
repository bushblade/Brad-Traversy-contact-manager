import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const links = [
  { path: '/', text: 'Home', icon: 'fa-home' },
  { path: '/about', text: 'About', icon: 'fa-plus' },
  { path: '/contact/add', text: 'Add Contact', icon: 'fa-question' }
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
            {links.map(link => {
              let { text, path, icon } = link
              return (
                <li className="nav-item" key={text}>
                  <Link className="nav-link" to={path}>
                    <i className={`fas ${icon}`} /> {text}
                  </Link>
                </li>
              )
            })}
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
