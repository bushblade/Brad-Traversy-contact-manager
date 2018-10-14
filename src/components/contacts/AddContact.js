import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addContact } from '../../actions/contactActions'
import { defaultState, createContactPayload, validate, updateFormField } from './contactHelpers'

import TextInputGroup from '../layout/TextInputGroup'

class AddContact extends Component {
  state = {
    name: { val: '', err: 'Name is required', msg: null },
    email: { val: '', err: 'Not a valid email', msg: null },
    phone: { val: '', err: 'Not a valid phone number', msg: null }
  }

  submit = () => {
    const { props, state } = this
    if (Object.keys(state).every(field => validate(field, state[field].val))) {
      const newContact = createContactPayload(state)
      props.addContact(newContact)
      this.setState(defaultState)
      props.history.push('/')
      return
    }
    Object.keys(this.state).forEach(field => this.updateField(field, this.state[field].val))
  }

  updateField = (field, value) => {
    this.setState(prevState => updateFormField(prevState, field, value))
  }

  render() {
    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form
            onSubmit={e => {
              e.preventDefault()
              this.submit()
            }}>
            {Object.keys(this.state).map(field => {
              return (
                <TextInputGroup
                  name={field}
                  val={this.state[field].val}
                  update={this.updateField}
                  key={field}
                  errMsg={this.state[field].msg}
                />
              )
            })}
            <input type="submit" value="Add Contact" className="btn btn-block btn-light" />
          </form>
        </div>
      </div>
    )
  }
}

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired
}

export default connect(
  null,
  { addContact }
)(AddContact)
