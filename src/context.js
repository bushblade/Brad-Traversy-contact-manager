import React, { Component } from 'react'
import axios from 'axios'

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
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }
    default:
      return state
  }
}

class ContextProvider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => this.setState({ contacts: res.data }))
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer, ContextProvider }
