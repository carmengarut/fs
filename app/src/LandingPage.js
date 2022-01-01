import './css/landingPage.css'
import headingImage from './public/heading-img.svg'
import coin from './public/coin.svg'
import standings from './public/standings.svg'
import eye from './public/eye.svg'
import logo from './public/logo-transparent.svg'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const LandingPage = () => {
  const history = useHistory()
  const { t } = useTranslation('global')
  return (
    <div className='LandingPageContainer'>
      <div className='HeadingBlock'>
        <div className='flex-item-left'>
          <h1 className='H1'>{t('landing_page.h1')}</h1>
          <h2 className='H2'>{t('landing_page.h2')}</h2>
          <div>
            <button className='ButtonLeft' onClick={() => { history.push('/register') }}>{t('landing_page.button_1')}</button>
            <button className='ButtonRight' onClick={() => { history.push('/register') }}>{t('landing_page.button_2')}</button>
          </div>
        </div>
        <img
          alt=''
          src={headingImage}
          width='531px'
          height='418px'
          className='flex-item-right'
        />

      </div>
      <div className='BoxesBlock'>
        <div className='Box'>
          <img
            alt=''
            src={eye}
            width='48px'
            height='48px'
          />
          <h3 className='BoxTitle'>
            {t('landing_page.box_1_title')}
          </h3>
          <div className='BoxText'>
            {t('landing_page.box_1_content')}
          </div>
        </div>
        <div className='Box'>
          <img
            alt=''
            src={standings}
            width='48px'
            height='48px'
          />
          <h3 className='BoxTitle'>
            {t('landing_page.box_2_title')}
          </h3>
          <div className='BoxText'>
            {t('landing_page.box_2_content')}
          </div>
        </div>
        <div className='Box'>
          <img
            alt=''
            src={coin}
            width='48px'
            height='48px'
          />
          <h3 className='BoxTitle'>
            {t('landing_page.box_3_title')}
          </h3>
          <div className='BoxText'>
            {t('landing_page.box_3_content')}
          </div>
        </div>
      </div>
      <footer>
        <div className='FooterBlock'>
          <div>
            <img
              alt=''
              src={logo}
              width='40px'
              height='40px'
            />
            eTrust
          </div>

          <div className='ContactFooter'>{t('footer.contact_details')}</div>
        </div>

      </footer>
    </div>

  )
}

export default LandingPage
