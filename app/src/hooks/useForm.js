/* eslint-disable */

//https://dev.to/codebucks/form-validation-in-reactjs-by-building-reusable-custom-hook-1bg7
import { useState } from 'react'
import { omit } from 'lodash'

const useForm = () => {
  // Form values
  const [values, setValues] = useState({})
  // Errors
  const [errors, setErrors] = useState({})

  const validate = (event, name, value) => {
    // A function to validate each input values

    switch (name) {
      case 'title':
        if (value === '') {
          // we will set the error state

          setErrors({
            ...errors,
            title: 'Required'
          })
        } else {
          // set the error state empty or remove the error for username input

          // omit function removes/omits the value from given object and returns a new object
          const newObj = omit(errors, 'title')
          setErrors(newObj)
        }
        break

        case 'content':
            if (value === '') {
                // we will set the error state

                setErrors({
                ...errors,
                content: 'Required'
                })
            } else {
                // set the error state empty or remove the error for username input

                // omit function removes/omits the value from given object and returns a new object
                const newObj = omit(errors, 'content')
                setErrors(newObj)
            }
            break

      case 'email':
        if (
          !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
        ) {
          setErrors({
            ...errors,
            email: 'Enter a valid email address'
          })
        } else {
          const newObj = omit(errors, 'email')
          setErrors(newObj)
        }
        break

      case 'password':
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
          })
        } else {
          const newObj = omit(errors, 'password')
          setErrors(newObj)
        }
        break

      default:
        break
    }
  }

  // A method to handle form inputs
  const handleChange = (event) => {
    // To stop default events
    event.persist()

    const name = event.target.name
    const val = event.target.value

    // Let's set these values in state
    setValues({
      ...values,
      [name]: val
    })
  }

  const onSubmit = (event) => {

    if (event) event.preventDefault()

    values.forEach( name => validate(event, name, values[name] ))


    if(errors.length === 0){ 
        setValues({})
        return true
    } else {
        alert('There is an error')
        return false
    }

  }

  return {
    values,
    errors,
    handleChange,
    onSubmit
  }
}

export default useForm
