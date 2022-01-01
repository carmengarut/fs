import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './css/users.css'

import avatar from './public/avatar.svg'
import SectionTitle from './components/SectionTitle'

export default function Users () {
  const users = useSelector(state => state.users)
  const [search, setSearch] = useState('')

  const { t } = useTranslation('global')

  return (
    <div className='UsersContainer'>
      <SectionTitle>
        {t('users_page.users')}
      </SectionTitle>

      <input
        className='SearchField'
        type='text'
        value={search}
        name='Search'
        placeholder={t('users_page.search')}
        onChange={({ target }) => { setSearch(target.value) }}
      />

      {!users[0]
        ? <div />
        : users.filter(user => {
          const fullname = user.name + ' ' + user.surname
          return (fullname.toLowerCase().includes(search.toLowerCase()) && user.status !== 'inactive')
        }).map(user => (
          <div key={user.id} className='UsersTableRow'>
            <img
              style={{
                width: '60px',
                height: '60px',
                resizeMode: 'contain',
                borderRadius: '50%'
              }}
              src={user.profileImg || avatar}
              alt={user.name}
            />
            <div className='Name'>
              {user.name} {user.surname}
              <span className='TrustRate'>{user.trustRate} {t('users_page.trust_rate')}</span>
            </div>

          </div>))}
    </div>
  )
}
