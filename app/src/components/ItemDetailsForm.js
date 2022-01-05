import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { editItem } from '../reducers/itemReducer'
import '../css/dealDetailsForm.css'

export default function ItemDetailsForm ({ item }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const business = useSelector(state => state.business)

  const { id } = useParams()

  const dispatch = useDispatch()
  const { t } = useTranslation('global')

  useEffect(() => {
    if (item) {
      setTitle(item.title)
      setContent(item.content)
    }
  }, [item])

  const handleSign = () => {

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const editedContract = {
      title,
      content,
      senderName: business.name,
      receiverName: business.id === item.member.id ? `${item.createdBy.name} ${item.createdBy.surname}` : `${item.member.name} ${item.member.surname}`,
      receiverEmail: business.id === item.member.id ? item.createdBy.email : item.member.email
    }
    dispatch(editItem(id, editedContract))
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

        <div className='DDF-creation-date'>{t('deal_details_form.creation_date')}{item.date.slice(0, 10)}</div>

        <div className='DDF-buttons-container'>
          {(title === item.title && content === item.content)
            ? ''
            : (
              <button type='submit' className='DDF-save-button'>
                {t('deal_details_form.propose_changes')}
              </button>)}

          {item.status === 'New'
            ? item.signedBy.length > 0
                ? item.signedBy.find(businessSigned => businessSigned.id === business.id)
                    ? ''
                    : <button type='button' onClick={handleSign} className='DDF-sign-button'>{t('deal_details_form.sign_now')}</button>
                : <button type='button' onClick={handleSign} className='DDF-sign-button'>{t('deal_details_form.sign_now')}</button>
            : ''}
        </div>
      </form>
    </>
  )
}
