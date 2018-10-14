import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getContacts } from '../../actions/contactActions'

import Contact from './Contact'

class Contacts extends Component {
  componentDidMount() {
    // this.props.dispatch({ type: GET_CONTACTS })
    this.props.getContacts()
  }

  render() {
    const { contacts } = this.props
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Contact </span>
          List
        </h1>
        {contacts.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </React.Fragment>
    )
  }
}

Contacts.protoTypes = {
  contacts: PropTypes.array.isRequired,
  getContacts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ contacts: state.contact.contacts })

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts)

// export default connect(state => ({ contacts: state.contact.contacts }))(Contacts)
