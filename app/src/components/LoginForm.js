
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { userLogin } from '../reducers/userReducer'
import Notification from './Notification'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import logo from '../public/blue-logo.png'
import '../css/loginForm.css'

export default function LoginForm () {
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
      <div className='LoginComponent'>

        <img
          src={logo}
          width='80'
          height='80'
          className='Flag'
        />
        <div className='LoginContainer'>
          <h3 className='LoginTitle'>{t('sign_in.title')}</h3>

          <form onSubmit={handleLogin}>
            <div className='LoginFieldGroup'>
              <label>{t('sign_in.email')}</label>
              <input
                className='LoginField'
                type='email'
                value={email}
                name='Email'
                placeholder={t('sign_in.email')}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </div>

            <div className='LoginFieldGroup'>
              <label>{t('sign_in.password')}</label>
              <input
                className='LoginField'
                type='password'
                value={password}
                name='Password'
                placeholder={t('sign_in.password')}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </div>

            <button className='LoginButton' id='form-login-button'>
              {t('sign_in.login')}
            </button>
            {' '}{' '}{t('sign_in.dont_have_account')}<a onClick={() => history.push('/register')} href=''>{t('sign_in.sign_up')}</a>
          </form>
        </div>
      </div>
    </>
  )
}

LoginForm.propTypes = {
  email: propTypes.string
}
