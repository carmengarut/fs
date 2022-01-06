
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userLogin } from '../reducers/userReducer'
import Notification from './Notification'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logo from '../public/logo-header.svg'
import '../css/loginForm.css'

export default function BusinessLoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin({ email, password }))
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <Notification />
      <div className='lf-container'>
        <img
          src={logo}
          width='80'
          height='80'
          className='Flag'
        />
        <div className='lf-box'>
          <h3 className='lf-title'>{t('sign_in.title')}</h3>

          <form onSubmit={handleLogin}>
            <div className='lf-field-group'>
              <label>{t('sign_in.email')}</label>
              <input
                className='lf-field'
                type='email'
                value={email}
                name='Email'
                placeholder={t('sign_in.email')}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </div>

            <div className='lf-field-group'>
              <label>{t('sign_in.password')}</label>
              <input
                className='lf-field'
                type='password'
                value={password}
                name='Password'
                placeholder={t('sign_in.password')}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </div>

            <button className='lf-button' id='form-login-button'>
              {t('sign_in.login')}
            </button>
            {' '}{' '}{t('sign_in.dont_have_account')}
            <a
              onClick={() => history.push('/register')}
              href=''
              className='lf-link'
            >
              {t('sign_in.sign_up')}
            </a>
          </form>
        </div>
      </div>
    </>
  )
}

BusinessLoginForm.propTypes = {
  email: propTypes.string
}
