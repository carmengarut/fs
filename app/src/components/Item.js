import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import '../css/items.css'

import avatar from '../public/avatar.svg'

const Item = ({ item }) => {
  const business = useSelector(state => state.business)
  const businesses = useSelector(state => state.businesses)

  const history = useHistory()
  const { t } = useTranslation('global')

  return (
    <div className='TableRow' key={item.id} onClick={() => { history.push(`/items/${item.id}`) }}>

      <div className='ColumnMemberTitle'>
        {item.title}
      </div>
      <div className='ColumnsContainer1'>
        <div className='ColumnMember'>
          <img
            src={(business.id === item.member.id)
              ? item.createdBy.profileImg || avatar
              : item.member.profileImg || avatar}
            width='30px'
            height='30px'
            className='Avatar'
          /> {' '}
          {console.log(item.member.id === false)}
          {item.member.id !== 'undefined'
            ? business.id === item.member.id
                ? item.createdBy.name
                    ? item.createdBy.name
                    : item.createdBy.email
                : item.member.name
                  ? item.member.name
                  : item.member.email
            : business.id === item.member
              ? businesses.find(business => business.id === item.createdBy).name
              : businesses.find(business => business.id === item.member).name}
        </div>
        <div className='ColumnMember'>
          {item.date.slice(0, 10)}
        </div>
      </div>
      <div className='ColumnsContainer2'>
        <div className='ColumnSignedContainer'>
          <div className={item.signedBy.find(member => member.id === business.id)
            ? 'ColumnSignedGreen'
            : item.signedBy.find(member => member === business.id)
              ? 'ColumnSignedGreen'
              : 'ColumnSignedRed'}
          >

            {item.signedBy.find(member => member.id === business.id)
              ? t('deal.signed')
              : item.signedBy.find(member => member === business.id)
                ? t('deal.signed')
                : t('deal.not_signed')}

          </div>
        </div>
        <div className='ColumnStatusContainer'>
          <div className='ColumnStatus'>

            {item.status}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
