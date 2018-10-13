import uuid from 'uuid'

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

const validate = (field, value) => {
  const regex = {
    name: /\S/,
    email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
    phone: /^(\d-?)+$/g
  }
  return !regex[field].test(value) || value.length === 0 ? false : true
}

const updateFormField = (state, field, value) => {
  let updated = { [field]: { ...state[field] } }
  updated[field].val = value
  if (!validate(field, value)) {
    updated[field].msg = updated[field].err
  } else {
    updated[field].msg = null
  }
  return updated
}

export { defaultState, createContactPayload, validate, updateFormField }
