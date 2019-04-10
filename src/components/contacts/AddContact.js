import React, { Component } from 'react'
import { Consumer } from '../../context'
import axios from 'axios'
import { defaultState, createContactPayload, validate, updateFormField } from './contactHelpers'

import TextInputGroup from '../layout/TextInputGroup'

class AddContact extends Component {
  state = {
    name: { val: '', err: 'Name is required', msg: null },
    email: { val: '', err: 'Not a valid email', msg: null },
    phone: { val: '', err: 'Not a valid phone number', msg: null }
  }

  submit = async ({ context: { dispatch }, state }) => {
    if (Object.keys(state).every(field => validate(field, state[field].val))) {
      const newContact = createContactPayload(state)
      const res = await axios.post(`https://jsonplaceholder.typicode.com/users`, newContact)
      dispatch({ type: 'ADD_CONTACT', payload: res.data })
      this.setState(defaultState)
      this.props.history.push('/')
      return
    }
    Object.keys(state).forEach(field => this.updateField(field, state[field].val))
  }

  updateField = (field, value) => {
    this.setState(prevState => updateFormField(prevState, field, value))
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
                }}
              >
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
        )}
      </Consumer>
    )
  }
}

export default AddContact
