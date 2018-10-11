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
    this.setState({
      name: { val: '', err: 'Name is required', msg: null },
      email: { val: '', err: 'Not a valid email', msg: null },
      phone: { val: '', err: 'Not a valid phone number', msg: null }
    })
  }

  updateField = (field, value) => {
    this.setState(prevState => ({
      [field]: {
        val: value,
        err: prevState[field].err,
        msg: prevState[field].msg
      }
    }))
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
    console.log('submitting')
    if (Object.keys(this.state).every(field => this.validate(field))) {
      context.dispatch({
        type: 'ADD_CONTACT',
        payload: this.createContactPayload()
      })
      this.setdefaultState()
    }
    Object.keys(this.state).forEach(field => this.validate(field))
  }

  validate = field => {
    console.log(`validating ${field}`)
    const regex = {
      name: /\S/,
      email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      phone: /^(\d\-?)+$/g
    }
    if (
      !regex[field].test(this.state[field].val) ||
      this.state[field].val.length === 0
    ) {
      console.log('not valid')
      this.setState(prevState => ({
        [field]: {
          val: prevState[field].val,
          err: prevState[field].err,
          msg: prevState[field].err
        }
      }))
      return false
    } else {
      console.log('valid')
      this.setState(prevState => ({
        [field]: {
          val: prevState[field].val,
          err: prevState[field].err,
          msg: prevState[field].null
        }
      }))
      return true
    }
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
                      update={this.updateField}
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
