import React from 'react'
import PropTypes from 'prop-types'

const TextInputGroup = ({ name, val, update, errMsg }) => (
  <div className="form-group">
    <label htmlFor={name} style={{ textTransform: 'capitalize' }}>
      {name}
    </label>
    <input
      type={name}
      name={name}
      className="form-control form-control-lg"
      placeholder={`Enter ${name}...`}
      value={val}
      onChange={e => update(name, e.target.value)}
    />
    {errMsg ? <p>{errMsg}</p> : null}
  </div>
)

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
}

export default TextInputGroup
