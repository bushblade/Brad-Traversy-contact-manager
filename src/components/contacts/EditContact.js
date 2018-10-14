import React, { Component } from 'react'
import { validate, updateFormField } from './contactHelpers'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getContact } from '../../actions/contactActions'
import { updateContact } from '../../actions/contactActions'

import TextInputGroup from '../layout/TextInputGroup'

class EditContact extends Component {
  state = {
    name: { val: '', err: 'Name is required', msg: null },
    email: { val: '', err: 'Not a valid email', msg: null },
    phone: { val: '', err: 'Not a valid phone number', msg: null }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.contact !== prevProps.contact) {
      const { name, email, phone } = this.props.contact
      this.setState(prevState => {
        const newState = { ...prevState }
        newState.name.val = name
        newState.email.val = email
        newState.phone.val = phone
        return newState
      })
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getContact(id)
  }

  submit = () => {
    const { id } = this.props.match.params
    const { state } = this
    if (Object.keys(state).every(field => validate(field, state[field].val))) {
      const updatedContact = {
        name: state.name.val,
        email: state.email.val,
        phone: state.phone.val,
        id
      }
      this.props.updateContact(updatedContact)
      this.props.history.push('/')
    }
    Object.keys(state).forEach(field => this.updateField(field, state[field].val))
  }

  updateField = (field, value) => {
    this.setState(prevState => updateFormField(prevState, field, value))
  }

  render() {
    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
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
            <input type="submit" value="Update Contact" className="btn btn-block btn-light" />
          </form>
        </div>
      </div>
    )
  }
}

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  contact: state.contact.contact
})

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact)
