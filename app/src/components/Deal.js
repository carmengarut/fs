import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import '../css/deals.css'

import avatar from '../public/avatar.svg'

const Deal = ({ deal }) => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const history = useHistory()
  const { t } = useTranslation('global')

  return (
    <div className='TableRow' key={deal.id} onClick={() => { history.push(`/deals/${deal.id}`) }}>

      <div className='ColumnMemberTitle'>
        {deal.title}
      </div>
      <div className='ColumnsContainer1'>
        <div className='ColumnMember'>
          <img
            src={(user.id === deal.member.id)
              ? deal.createdBy.profileImg || avatar
              : deal.member.profileImg || avatar}
            width='30px'
            height='30px'
            className='Avatar'
          /> {' '}
          {console.log(deal.member.id === false)}
          {deal.member.id !== 'undefined'
            ? user.id === deal.member.id
                ? deal.createdBy.name
                    ? deal.createdBy.name
                    : deal.createdBy.email
                : deal.member.name
                  ? deal.member.name
                  : deal.member.email
            : user.id === deal.member
              ? users.find(user => user.id === deal.createdBy).name
              : users.find(user => user.id === deal.member).name}
        </div>
        <div className='ColumnMember'>
          {deal.date.slice(0, 10)}
        </div>
      </div>
      <div className='ColumnsContainer2'>
        <div className='ColumnSignedContainer'>
          <div className={deal.signedBy.find(member => member.id === user.id)
            ? 'ColumnSignedGreen'
            : deal.signedBy.find(member => member === user.id)
              ? 'ColumnSignedGreen'
              : 'ColumnSignedRed'}
          >

            {deal.signedBy.find(member => member.id === user.id)
              ? t('deal.signed')
              : deal.signedBy.find(member => member === user.id)
                ? t('deal.signed')
                : t('deal.not_signed')}

          </div>
        </div>
        <div className='ColumnStatusContainer'>
          <div className='ColumnStatus'>

            {deal.status}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Deal
