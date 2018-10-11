import React, { Component } from 'react'
import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup'
import uuid from 'uuid'

class AddContact extends Component {
  state = {
    name: { val: '', err: 'Name is required', msg: null },
    email: { val: '', err: 'Not a valid email', msg: null },
    phone: { val: '', err: 'Not a valid phone number', msg: null }
  }

  setdefaultState = () => {
    const defaultState = { ...this.state }
    for (let key in defaultState) {
      defaultState[key].val = ''
      defaultState[key].msg = null
    }
    this.setState(defaultState)
  }

  createContactPayload = () => {
    const { name, email, phone } = this.state
    return {
      name: name.val,
      email: email.val,
      phone: phone.val,
      id: uuid()
    }
  }

  submit = context => {
    if (
      Object.keys(this.state).every(field =>
        this.validate(field, this.state[field].val)
      )
    ) {
      context.dispatch({
        type: 'ADD_CONTACT',
        payload: this.createContactPayload()
      })
      this.setdefaultState()
      return
    }
    Object.keys(this.state).forEach(field => this.validate(field))
  }

  validate = (field, value) => {
    const regex = {
      name: /\S/,
      email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
      phone: /^(\d-?)+$/g
    }
    let valid,
      update = { ...this.state }
    update[field].val = value
    if (
      !regex[field].test(update[field].val) ||
      update[field].val.length === 0
    ) {
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
                  this.submit(context)
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
                <input
                  type="submit"
                  value="Add Contact"
                  className="btn btn-block btn-light"
                />
              </form>
            </div>
          </div>
        )}
      </Consumer>
    )
  }
}

export default AddContact
