import React from 'react'

export default props => {
  const { val, update } = props.field
  return (
    <div className="form-group">
      <label htmlFor={key} style={{ textTransform: 'capitalize' }}>
        {key}
      </label>
      <input
        type="text"
        name={key}
        className="form-control form-control-lg"
        placeholder={`Enter ${key}...`}
        value={val}
        onChange={e => update({ [key]: e.target.value })}
      />
    </div>
  )
}
