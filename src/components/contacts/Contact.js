import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'
import axios from 'axios'

const deleteContact = async ({ dispatch }, id) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
  } catch (e) {
    console.log(e)
  } finally {
    dispatch({ type: 'DELETE_CONTACT', payload: id })
  }
}

class Contact extends Component {
  state = {
    showContactInfo: false
  }

  render() {
    const { name, email, phone, id } = this.props.contact // prettier-ignore
    const { showContactInfo } = this.state
    return (
      <Consumer>
        {context => (
          <div className="card card-body mb-3">
            <h4>
              {name}{' '}
              <i
                onClick={() =>
                  this.setState({
                    showContactInfo: !this.state.showContactInfo
                  })
                }
                className="fas fa-sort-down"
                style={{ cursor: 'pointer' }}
              />
              <i
                className="fas fa-times"
                style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                onClick={() => deleteContact(context, id)}
              />
              <Link to={`contact/edit/${id}`}>
                <i
                  className="fas fa-pencil-alt"
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    color: 'black',
                    marginRight: '1rem'
                  }}
                />
              </Link>
            </h4>
            {showContactInfo ? (
              <ul className="list-group">
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone: {phone}</li>
              </ul>
            ) : null}
          </div>
        )}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}

export default Contact
