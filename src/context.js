import React, { Component } from 'react'

const { Provider, Consumer } = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      }
    default:
      return state
  }
}

class ContextProvider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        phone: '555-555-5555'
      },
      {
        id: 2,
        name: 'Karen Williams',
        email: 'kwilliams@gmail.com',
        phone: '222-222-2222'
      },
      {
        id: 3,
        name: 'Henry Johnson',
        email: 'henry.johnson@gmail.com',
        phone: '333-333-3333'
      }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer, ContextProvider }
