import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { useTranslation } from 'react-i18next'

import avatar from '../public/avatar.svg'

import '../css/dealDetailsRatings.css'

export default function ItemDetailsOrders () {
  const { id } = useParams()

  const orders = useSelector(state => state.orders).filter(order => order.deal === id)
  const user = useSelector(state => state.user)

  const history = useHistory()
  const { t } = useTranslation('global')

  return (
    <div className='DDR-container'>
      <div>{t('ratings.contract_ratings')}</div>
      <div className='DDR-ratings-container'>
        {
        orders.length > 0
          ? orders.filter(order => order.deal === id).map(order => (
            <div key={order.id} className='DDR-rating-card'>
              <div className='DDR-rating-header'>
                <div className='DDR-name-container'>
                  <img
                    src={order.createdBy.profileImg || avatar}
                    width='40px'
                    height='40px'
                  />
                  <div className='DDR-name'>{order.createdBy.name} {order.createdBy.surname}</div>
                </div>
                {
              order.fulfilled === 'True'
                ? <FontAwesome name='thumbs-up' size='2x' className='DDR-thumbs-up' />
                : <FontAwesome name='thumbs-down' size='2x' className='DDR-thumbs-down' />
}

              </div>
              <i className='DDR-quote'>"{order.content}"</i>

            </div>
            ))
          : <div className='DDR-rating-card-empty'>{t('ratings.no_ratings')}</div>
      }
      </div>
      {
        orders.find(order => order.createdBy.id ? order.createdBy.id === user.id : order.createdBy === user.id)
          ? ''
          : (
            <div className='DDR-button-container'>
              <button
                onClick={() => history.push(`/order/${id}`)}
                className='DDR-rating-button'
              >
                {t('ratings.submit_rating')}
              </button>
            </div>
            )
      }

    </div>
  )
}
