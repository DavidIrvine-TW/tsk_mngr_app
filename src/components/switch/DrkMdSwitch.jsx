import React from 'react'

const DrkMdSwitch = ({checked, toggle}) => {

  return (
    <label className="Switch__label" aria-label="Dark mode">
        <input className="peer Switch__input" type="checkbox" checked={checked} onChange={toggle} />
        <span className="Switch__span"></span>
      </label>
  )
}

export default DrkMdSwitch