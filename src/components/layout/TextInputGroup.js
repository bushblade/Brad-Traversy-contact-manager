import React from 'react'
import PropTypes from 'prop-types'

const TextInputGroup = ({ name, val, update, errMsg }) => {
  const validateClasses = () => {
    if (!errMsg && val.length > 1) {
      return 'form-control form-control-lg is-valid'
    } else if (errMsg) {
      return 'form-control form-control-lg is-invalid'
    } else {
      return 'form-control form-control-lg'
    }
  }
  return (
    <div className="form-group">
      <label htmlFor={name} style={{ textTransform: 'capitalize' }}>
        {name}
      </label>
      <input
        type={name}
        name={name}
        className={validateClasses()}
        placeholder={`Enter ${name}...`}
        value={val}
        onChange={e => update(name, e.target.value)}
      />
      {errMsg ? <div className="invalid-feedback">{errMsg}</div> : null}
    </div>
  )
}

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
}

export default TextInputGroup
