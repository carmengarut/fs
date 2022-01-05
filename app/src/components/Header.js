import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { userLogout } from '../reducers/userReducer'
import { useSelector } from 'react-redux'
import logo from '../public/blue-logo.png'
import '../css/header.css'
import contractsIcon from '../public/contracts-icon.svg'
import usersIcon from '../public/users-icon.svg'
import profileIcon from '../public/profile-icon.svg'
import menuIcon from '../public/menu-icon.svg'

export default function Header () {
  const user = useSelector(state => state.user)

  // const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  return (
    <header className='Header'>
      <img
        alt=''
        src={logo}
        width='45'
        height='45'
        onClick={() => { history.push('/') }}
        className='HeaderLogo'
      />{' '}
      <div className='Block'>
        <img
          alt=''
          src={menuIcon}
          width='30'
          height='30'
          className='MenuButton'
        />
        <div className='ToggleSection'>
          <nav className='NavigationMenu'>
            <div className='Section' onClick={() => { history.push('/items') }}>
              <img
                alt=''
                src={contractsIcon}
                width='30'
                height='30'
                className='SectionIcon'
              />
              <div className='ToggleSectionTitle'>{t('header.agreements')}</div>
            </div>
            <div className='Section' onClick={() => { history.push('/users') }}>
              <img
                alt=''
                src={usersIcon}
                width='30'
                height='30'
                className='SectionIcon'
              />
              <div className='ToggleSectionTitle'>{t('header.users')}</div>
            </div>
            {/* <Link to='/users'>
              Users
            </Link>
            <Link to='/profile'>
              My Profile
            </Link> */}
          </nav>
          {/* {
              user.email
                ? (
                  <div>
                    Signed in as: {user.name} <a onClick={() => { dispatch(userLogout()) }} variant='link' style={{ color: '#FFFFFF' }} href='#'>Logout</a>
                  </div>
                  )
                : (
                  <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                  </>
                  )
            } */}

          <div className='ProfileSection' onClick={() => { history.push('/profile') }}>
            <img
              style={{
                resizeMode: 'contain',
                borderRadius: '50%'
              }}
              alt=''
              src={user.profileImg || profileIcon}
              width='40'
              height='40'
              className='ProfileIcon'
            />
            <div className='ToggleSectionTitle'>{t('header.profile')}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
