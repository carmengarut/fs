import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userRegister } from '../reducers/userReducer'
import Notification from './Notification'

import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logo from '../public/blue-logo.png'
import '../css/registrationForm.css'

export default function RegistrationForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [profileImg, setProfileImg] = useState(null)

  // const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  // const handleClick = ({ target }) => {
  //   setShow(true)
  // }

  const handleRegister = (event) => {
    event.preventDefault()
    // const formData = new FormData()
    // formData.append('email', email)
    // formData.append('name', name)
    // formData.append('surname', surname)
    // formData.append('password', password)
    // formData.append('profileImg', profileImg)

    try {
      dispatch(userRegister({ email, password, name, surname, profileImg }))
      setEmail('')
      setPassword('')
      setName('')
      setSurname('')
      setProfileImg('')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='LoginComponent'>
      <img
        src={logo}
        width='80'
        height='80'
      />
      <div className='Container'>
        <h3 className='H3'>{t('sign_up.title')}</h3>
        <Notification />
        <form onSubmit={handleRegister}>
          <div className='Row1'>
            <div className='FieldGroup'>
              <label>{t('sign_up.name')}</label>
              <input
                className='Field'
                type='text'
                value={name}
                name='Name'
                placeholder={t('sign_up.name')}
                onChange={({ target }) => setName(target.value)}
                required
              />
            </div>
            <div className='FieldGroup'>
              <label>{t('sign_up.surname')}</label>
              <input
                className='Field'
                type='text'
                value={surname}
                name='Surname'
                placeholder={t('sign_up.surname')}
                onChange={({ target }) => setSurname(target.value)}
                required
              />

            </div>
          </div>
          <div className='Row2'>
            <div className='FieldGroup'>
              <label>{t('sign_up.email')}</label>
              <input
                className='Field'
                type='email'
                value={email}
                name='Email'
                placeholder={t('sign_up.email')}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </div>
            <div className='FieldGroup'>
              <label>{t('sign_up.password')}</label>
              <input
                className='Field'
                type='password'
                value={password}
                name='Password'
                placeholder={t('sign_up.password')}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </div>
          </div>
          <label className='CheckboxContainer'><span className='Label'>{t('sign_up.terms_and_conditions')}</span>
            <input type='checkbox' required />
            <span className='Checkbox' />
          </label>
          {/* <div className='CheckboxContainer'>
            <input
              type='checkbox'
              name='terms and conditions'
              required
            />
            <span className='Checkbox' />
            <label>I agree to terms and conditions</label>
          </div> */}
          {/* <Form.Group id='profileImg' className='mb-3'>
            <Form.Label>Profile image (Optional)</Form.Label>
            <br />
            {profileImg
              ? (
                <>
                  <img src={profileImg} />
                  <Button onClick={handleClick} variant='light'>
                    Cambiar imagen
                  </Button>
                </>
                )
              : (
                <Button onClick={handleClick} variant='light'>
                  Subir imagen
                </Button>
                )}
          </Form.Group> */}

          <button className='CreateAccountButton' id='form-login-button' type='submit'>
            {t('sign_up.create_account')}
          </button>

          {t('sign_up.have_account')}<a onClick={() => history.push('/login')} href=''>{t('sign_up.sign_in')}</a>

        </form>

      </div>
      {/* <CropImageModal show={show} setShow={setShow} setProfileImg={setProfileImg} /> */}

    </div>
  )
}

RegistrationForm.propTypes = {
  email: propTypes.string
}
