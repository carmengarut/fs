import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { addNewOrder } from '../reducers/orderReducer'
import { hideModal, showModal } from '../reducers/modalReducer'

import SectionTitle from './SectionTitle'
import Dropdown from './Dropdown'
import Modal from './Modal'

import successIcon from '../public/success-icon.svg'

import '../css/ratingForm.css'

const OrderForm = () => {
  const { t } = useTranslation('global')
  const [content, setContent] = useState('')
  const [recipient, setRecipient] = useState({})
  const [dropdownList, setDropdownList] = useState([
    {
      id: 0,
      title: t('rating_form.yes'),
      selected: false,
      key: 'fullfilled',
      value: 'True'
    },
    {
      id: 1,
      title: t('rating_form.no'),
      selected: false,
      key: 'fulfilled',
      value: 'False'
    }

  ])

  const { id } = useParams()
  const items = useSelector(state => state.items)
  const user = useSelector(state => state.user)

  const item = items.find(item => item.id === id.toString())
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (item) {
      setRecipient((user.id === item.member.id)
        ? item.createdBy
        : item.member)
    }
  }, [item])

  const resetThenSet = (id, key) => {
    setDropdownList(prev => {
      prev.forEach(item => { item.selected = false })
      prev[id].selected = true
      return prev
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    const orderObject = {
      fulfilled: dropdownList.find(item => item.selected === true).value,
      content,
      recipientId: recipient.id,
      itemId: id
    }

    dispatch(addNewOrder(orderObject))
    setContent('')
    dispatch(showModal())
  }

  if (!item) {
    return null
  }
  return (
    <div className='RF-container'>
      <SectionTitle>
        {t('rating_form.contracts')}
      </SectionTitle>
      <div className='RF-form-card'>
        <div>{t('rating_form.rate_contract')}</div>
        <form onSubmit={handleSubmit} className='RF-form'>
          <div className='RF-field-group'>
            <label>{t('rating_form.did_person_fulfill_1')}{recipient.name} {recipient.surname}{t('rating_form.did_person_fulfill_2')}</label>
            <Dropdown
              title='-'
              list={dropdownList}
              resetThenSet={resetThenSet}
            />
          </div>
          <div className='RF-field-group'>
            <label>{t('rating_form.description')}</label>
            <textarea
              className='RF-textarea'
              type='text'
              name='recipient'
              value={content}
              placeholder={t('rating_form.description_placeholder')}
              onChange={({ target }) => setContent(target.value)}
              required
            />
          </div>

          <button type='submit' className='RF-save-button'>
            {t('rating_form.save')}
          </button>
        </form>
      </div>
      <Modal
        action={() => {
          history.push(`/items/${id}`)
          dispatch(hideModal())
        }}
        displayCancelButton='none'
        buttonName={t('rating_form.accept')}
      >
        <img
          alt=''
          src={successIcon}
          width='100'
          height='100'
        />
        <h6>{t('rating_form.rating_added')}</h6>
        {t('rating_form.successfully_added')}
      </Modal>
    </div>
  )
}

export default OrderForm
