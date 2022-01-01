import React, { forwardRef, useImperativeHandle, useState } from 'react'
import propTypes from 'prop-types'
import { es } from '../i18n/index'
import Button from 'react-bootstrap/Button'

const Toggable = forwardRef(({ children, buttonLabel = 'show' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility}>{es.TOGGABLE.CANCEL_BUTTON}</Button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable' // Esto es para que en el warning si faltan proptypes aparezca bien el nombre del componente y no el forwardRef

Toggable.propTypes = {
  buttonLabel: propTypes.string
}

export default Toggable
