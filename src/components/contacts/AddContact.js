import React, { Component } from 'react'
import { Consumer } from '../../context'
import uuid from 'uuid'

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: ''
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
                  context.dispatch({
                    type: 'ADD_CONTACT',
                    payload: { ...this.state, id: uuid() }
                  })
                  this.setState({ name: '', email: '', phone: '' })
                }}>
                {Object.keys(this.state).map(field => (
                  <div className="form-group" key={field}>
                    <label
                      htmlFor={field}
                      style={{ textTransform: 'capitalize' }}>
                      {field}
                    </label>
                    <input
                      type="text"
                      name={field}
                      className="form-control form-control-lg"
                      placeholder={`Enter ${field}...`}
                      value={this.state[field]}
                      onChange={e => this.setState({ [field]: e.target.value })}
                    />
                  </div>
                ))}
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
