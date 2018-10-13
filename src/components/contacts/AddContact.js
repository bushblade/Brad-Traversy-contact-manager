import React, { Component } from 'react'
import { Consumer } from '../../context'
import uuid from 'uuid'
import axios from 'axios'

import TextInputGroup from '../layout/TextInputGroup'

const defaultState = ({ ...state }) => {
  for (let key in state) {
    state[key].val = ''
    state[key].msg = null
  }
  return state
}

const createContactPayload = ({ name, email, phone }) => {
  return {
    name: name.val,
    email: email.val,
    phone: phone.val,
    id: uuid()
  }
}

class AddContact extends Component {
  state = {
    name: { val: '', err: 'Name is required', msg: null },
    email: { val: '', err: 'Not a valid email', msg: null },
    phone: { val: '', err: 'Not a valid phone number', msg: null }
  }

  submit = async ({ context: { dispatch }, state }) => {
    if (Object.keys(state).every(field => this.validate(field, state[field].val))) {
      const newContact = createContactPayload(state)
      const res = await axios.post(`https://jsonplaceholder.typicode.com/users`, newContact)
      dispatch({ type: 'ADD_CONTACT', payload: res.data })
      this.setState(defaultState)
      this.props.history.push('/')
      return
    }
    Object.keys(state).forEach(field => this.validate(field, state[field].val))
  }

  validate = (field, value) => {
    const regex = {
      name: /\S/,
      email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
      phone: /^(\d-?)+$/g
    }
    let valid
    let update = { [field]: { ...this.state[field] } }
    update[field].val = value
    if (!regex[field].test(value) || value.length === 0) {
      update[field].msg = update[field].err
      valid = false
    } else {
      update[field].msg = null
      valid = true
    }
    this.setState(update)
    return valid
  }

  render() {
    return (
      <Consumer>
        {context => (
          <div className="card mb-3">
            <div className="card-header">Add Contact</div>
            <div className="card-body">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  this.submit({ context, state: this.state })
                }}>
                {Object.keys(this.state).map(field => {
                  return (
                    <TextInputGroup
                      name={field}
                      val={this.state[field].val}
                      update={this.validate}
                      key={field}
                      errMsg={this.state[field].msg}
                    />
                  )
                })}
                <input type="submit" value="Add Contact" className="btn btn-block btn-light" />
              </form>
            </div>
          </div>
        )}
      </Consumer>
    )
  }
}

export default AddContact
