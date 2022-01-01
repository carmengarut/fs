import { useHistory } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import '../css/headerWeb.css'
import logo from '../public/blue-logo.png'
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
    <Navbar collapseOnSelect expand='lg' sticky='top' className='Navbar'>
      <Container>
        <Navbar.Brand href='' className='BrandName' onClick={() => { history.push('/') }}>
          <img
            alt=''
            src={logo}
            width='45'
            height='45'
            className='d-inline-block align-center'
          />{' '}
          {t('header_web.brand_name')}
        </Navbar.Brand>
        <div className='HeaderRightBlock'>
          <div className='FlagBlock'>
            <img
              alt=''
              src={i18n.language === 'es'
                ? spainFlag
                : ukFlag}
              width='30'
              height='30'
            />
            <div className='FlagDropdown'>
              <li onClick={changeLanguageEn}>
                <img
                  alt=''
                  src={ukFlag}
                  width='30'
                  height='30'
                  className='Flag'
                /> {' '} {' '}
                {t('header_web.en')}
              </li>
              <li className='LastLanguage' onClick={changeLanguageEs}>
                <img
                  alt=''
                  src={spainFlag}
                  width='30'
                  height='30'
                  className='Flag'
                />{' '} {' '}
                {t('header_web.es')}
              </li>
            </div>
          </div>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>

            <div className='ActionButtons'>
              <button className='SignUpButton' onClick={() => history.push('/register')}>
                {t('header_web.sign_up')}
              </button>
              <button className='SignInButton' onClick={() => history.push('/login')}>
                {t('header_web.sign_in')}
              </button>
            </div>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}
