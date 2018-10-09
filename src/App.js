import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ContextProvider } from './context'

import Contacts from './components/contacts/Contacts'
import Header from './components/layout/Header'
import AddContact from './components/contacts/AddContact'

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <div className="App">
          <Header branding="Contact Manager" />
          <div className="container">
            <AddContact />
            <Contacts />
          </div>
        </div>
      </ContextProvider>
    )
  }
}

export default App
