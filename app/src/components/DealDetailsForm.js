import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { signDeal, editDeal } from '../reducers/dealReducer'
import '../css/dealDetailsForm.css'

export default function DealDetailsForm ({ deal }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const user = useSelector(state => state.user)

  const { id } = useParams()

  const dispatch = useDispatch()
  const { t } = useTranslation('global')

  useEffect(() => {
    if (deal) {
      setTitle(deal.title)
      setContent(deal.content)
    }
  }, [deal])

  const handleSign = () => {
    const users = [...deal.signedBy.map(user => user.id), user.id]
    dispatch(signDeal(id, users))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const editedContract = {
      title,
      content,
      senderName: user.name,
      receiverName: user.id === deal.member.id ? `${deal.createdBy.name} ${deal.createdBy.surname}` : `${deal.member.name} ${deal.member.surname}`,
      receiverEmail: user.id === deal.member.id ? deal.createdBy.email : deal.member.email
    }
    dispatch(editDeal(id, editedContract))
  }

  return (
    <>
      <div>{t('deal_details_form.contract_details')}</div>
      <form onSubmit={handleSubmit} className='DealDetailsForm'>
        <div className='DDF-field-group'>
          <label>{t('deal_details_form.title')}</label>
          <input
            className='DDF-field'
            type='text'
            name='title'
            value={title}
            placeholder={t('deal_details_form.title_placeholder')}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>

        <div className='DDF-field-group'>
          <label>{t('deal_details_form.content')}</label>
          <textarea
            className='DDF-textarea'
            name='content'
            value={content}
            placeholder={t('deal_details_form.content_placeholder')}
            onChange={({ target }) => setContent(target.value)}
            required
          />
        </div>

        <div className='DDF-creation-date'>{t('deal_details_form.creation_date')}{deal.date.slice(0, 10)}</div>

        <div className='DDF-buttons-container'>
          {(title === deal.title && content === deal.content)
            ? ''
            : (
              <button type='submit' className='DDF-save-button'>
                {t('deal_details_form.propose_changes')}
              </button>)}

          {deal.status === 'New'
            ? deal.signedBy.length > 0
              ? deal.signedBy.find(userSigned => userSigned.id === user.id)
                ? ''
                : <button type='button' onClick={handleSign} className='DDF-sign-button'>{t('deal_details_form.sign_now')}</button>
              : <button type='button' onClick={handleSign} className='DDF-sign-button'>{t('deal_details_form.sign_now')}</button>
            : ''}
        </div>
      </form>
    </>
  )
}
