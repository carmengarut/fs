import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { useTranslation } from 'react-i18next'

import avatar from '../public/avatar.svg'

import '../css/dealDetailsRatings.css'

export default function DealDetailsRatings () {
  const { id } = useParams()

  const ratings = useSelector(state => state.ratings).filter(rating => rating.deal === id)
  const user = useSelector(state => state.user)

  const history = useHistory()
  const { t } = useTranslation('global')

  return (
    <div className='DDR-container'>
      <div>{t('ratings.contract_ratings')}</div>
      <div className='DDR-ratings-container'>
        {
        ratings.length > 0
          ? ratings.filter(rating => rating.deal === id).map(rating => (
            <div key={rating.id} className='DDR-rating-card'>
              <div className='DDR-rating-header'>
                <div className='DDR-name-container'>
                  <img
                    src={rating.createdBy.profileImg || avatar}
                    width='40px'
                    height='40px'
                  />
                  <div className='DDR-name'>{rating.createdBy.name} {rating.createdBy.surname}</div>
                </div>
                {
              rating.fulfilled === 'True'
                ? <FontAwesome name='thumbs-up' size='2x' className='DDR-thumbs-up' />
                : <FontAwesome name='thumbs-down' size='2x' className='DDR-thumbs-down' />
}

              </div>
              <i className='DDR-quote'>"{rating.content}"</i>

            </div>
          ))
          : <div className='DDR-rating-card-empty'>{t('ratings.no_ratings')}</div>
      }
      </div>
      {
        ratings.find(rating => rating.createdBy.id ? rating.createdBy.id === user.id : rating.createdBy === user.id)
          ? ''
          : (
            <div className='DDR-button-container'>
              <button
                onClick={() => history.push(`/rate/${id}`)}
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
