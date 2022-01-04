import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import '../css/dealDetailsMemberCard.css'

import avatar from '../public/avatar.svg'

export default function DealDetailsMemberCard ({ deal, user }) {
  const users = useSelector(state => state.users)
  const { t } = useTranslation('global')

  console.log(user)
  return (
    <div className='DDMC-container'>
      <div className='DDMC-member-container'>
        <img
          src={user.profileImg || avatar}
          width='40px'
          height='40px'
          className='Avatar'
        /> {' '}
        <div className='DDMC-member-name'>
          <div>
            {
            user.id
              ? user.name
                  ? `${user.name} ${user.surname}`
                  : `${user.email} ${t('deal_details_member_card.invitation_pending')}`
              : `${users.find(userElem => userElem.id === user).name} ${users.find(userElem => userElem.id === user).surname}`
            }
          </div>
          {deal.createdBy === user
            ? <div className='DDMC-creator'>{t('deal_details_member_card.creator')}</div>
            : ''}
        </div>
      </div>
      <div className='DDMC-signed-container'>
        <span className={
        deal.signedBy.some(userSigned => userSigned.id === user.id)
          ? 'DDMC-signed-green'
          : 'DDMC-signed-red'
      }
        >
          {
        deal.signedBy.some(userSigned => userSigned.id === user.id)
          ? t('deal_details_member_card.signed')
          : t('deal_details_member_card.not_signed')
      }
        </span>
      </div>
    </div>
  )
}
