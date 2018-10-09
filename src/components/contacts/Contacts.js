import React from 'react'
import Contact from './Contact'
import { Consumer } from '../../context'

const Contacts = props => (
  <Consumer>
    {context => {
      const { contacts } = context
      return (
        <React.Fragment>
          {contacts.map(contact => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </React.Fragment>
      )
    }}
  </Consumer>
)

export default Contacts
