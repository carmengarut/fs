import './css/landingPage.css'
import headingImage from './public/heading-img.png'
import users from './public/users-icon-landing.svg'
import time from './public/time-icon-landing.svg'
import money from './public/money-icon-landing.svg'
import logo from './public/transparent-logo.svg'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const LandingPage = () => {
  const history = useHistory()
  const { t } = useTranslation('global')
  return (
    <div className='lp-container'>
      <div className='lp-heading-block'>
        <div className='lp-heading-block-left'>
          <h1 className='lp-h1'>{t('landing_page.h1')}</h1>
          <h2 className='lp-h2'>{t('landing_page.h2')}</h2>
          <div>
            <button className='lp-call-to-action-left' onClick={() => { history.push('/register') }}>{t('landing_page.button_1')}</button>
            <button className='lp-call-to-action-right' onClick={() => { history.push('/register') }}>{t('landing_page.button_2')}</button>
          </div>
        </div>
        <img
          alt=''
          src={headingImage}
          width='auto'
          height='450px'
          className='lp-heading-block-right'
        />

      </div>
      <div className='lp-boxes-container'>
        <div className='lp-box'>
          <img
            alt=''
            src={time}
            width='48px'
            height='48px'
          />
          <h3 className='lp-box-title'>
            {t('landing_page.box_1_title')}
          </h3>
          <div className='lp-box-text'>
            {t('landing_page.box_1_content')}
          </div>
        </div>
        <div className='lp-box'>
          <img
            alt=''
            src={money}
            width='48px'
            height='48px'
          />
          <h3 className='lp-box-title'>
            {t('landing_page.box_2_title')}
          </h3>
          <div className='lp-box-text'>
            {t('landing_page.box_2_content')}
          </div>
        </div>
        <div className='lp-box'>
          <img
            alt=''
            src={users}
            width='48px'
            height='48px'
          />
          <h3 className='lp-box-title'>
            {t('landing_page.box_3_title')}
          </h3>
          <div className='lp-box-text'>
            {t('landing_page.box_3_content')}
          </div>
        </div>
      </div>
      <footer>
        <div className='lp-footer-container'>
          <div>
            <img
              alt=''
              src={logo}
              width='40px'
              height='40px'
              className='lp-footer-logo'
            />
            Kampei
          </div>

          <div>{t('footer.contact_details')}</div>
        </div>

      </footer>
    </div>

  )
}

export default LandingPage
