import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }

  return (
    <Alert variant='primary'>
      {notification}
    </Alert>
  )
}

export default Notification
