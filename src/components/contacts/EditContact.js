import React, { Component } from 'react'
import { Consumer } from '../../context'
import axios from 'axios'
import { defaultState, validate, updateFormField } from './contactHelpers'

import TextInputGroup from '../layout/TextInputGroup'

class EditContact extends Component {
  state = {
    name: { val: '', err: 'Name is required', msg: null },
    email: { val: '', err: 'Not a valid email', msg: null },
    phone: { val: '', err: 'Not a valid phone number', msg: null }
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    const { name, email, phone } = res.data
    this.setState(prevState => {
      const newState = { ...prevState }
      newState.name.val = name
      newState.email.val = email
      newState.phone.val = phone
      return newState
    })
  }

  submit = async ({ context: { dispatch }, state }) => {
    const { id } = this.props.match.params
    if (Object.keys(state).every(field => validate(field, state[field].val))) {
      const updatedContact = {
        name: state.name.val,
        email: state.email.val,
        phone: state.phone.val
      }
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedContact
      )
      dispatch({ type: 'EDIT_CONTACT', payload: res.data })
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
            <div className="card-header">Edit Contact</div>
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
        )}
      </Consumer>
    )
  }
}

export default EditContact
