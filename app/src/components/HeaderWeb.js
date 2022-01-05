import { useHistory } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import '../css/headerWeb.css'
import logo from '../public/logo-header.svg'
import spainFlag from '../public/spain-flag.svg'
import ukFlag from '../public/uk-flag.svg'

import { useTranslation } from 'react-i18next'

export default function HeaderWeb () {
  const [t, i18n] = useTranslation('global')
  const history = useHistory()

  const changeLanguageEn = () => {
    i18n.changeLanguage('en')
    window.localStorage.setItem(
      'language', 'en'
    )
  }

  const changeLanguageEs = () => {
    i18n.changeLanguage('es')
    window.localStorage.setItem(
      'language', 'es'
    )
  }

  return (
    <Navbar collapseOnSelect expand='lg' sticky='top' variant='dark'>
      <Container>
        <Navbar.Brand href='' className='hw-brand-container' onClick={() => { history.push('/') }}>
          <img
            alt=''
            src={logo}
            width='35'
            height='35'
          />{' '}
          <div className='hw-brand-name'>{t('header_web.brand_name')}</div>
        </Navbar.Brand>
        <div className='hw-right-block'>
          <div className='hw-flag-container'>
            <img
              alt=''
              src={i18n.language === 'es'
                ? spainFlag
                : ukFlag}
              width='30'
              height='30'
            />
            <div className='hw-flag-dropdown'>
              <li onClick={changeLanguageEn}>
                <img
                  alt=''
                  src={ukFlag}
                  width='30'
                  height='30'
                  className='hw-flag'
                /> {' '} {' '}
                {t('header_web.en')}
              </li>
              <li className='hw-last-language' onClick={changeLanguageEs}>
                <img
                  alt=''
                  src={spainFlag}
                  width='30'
                  height='30'
                  className='hw-flag'
                />{' '} {' '}
                {t('header_web.es')}
              </li>
            </div>
          </div>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>

            <div className='hw-action-buttons-container'>
              <button className='hw-signup-button' onClick={() => history.push('/register')}>
                {t('header_web.sign_up')}
              </button>
              <button className='hw-signin-button' onClick={() => history.push('/login')}>
                {t('header_web.sign_in')}
              </button>
            </div>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}
