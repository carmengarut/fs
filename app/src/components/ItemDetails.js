
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'
import SectionTitle from './SectionTitle'
import ItemDetailsMemberCard from './ItemDetailsMemberCard'
import ItemDetailsForm from './ItemDetailsForm'
import ItemDetailsRatings from './ItemDetailsOrders'

import { hideModal } from '../reducers/modalReducer'

import successIcon from '../public/success-icon.svg'

import '../css/dealDetails.css'
export default function ItemDetails () {
  const items = useSelector(state => state.items)

  const { id } = useParams()

  const item = items.find(item => item.id === id.toString())

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  const goToContracts = () => {
    history.push('/items')
    dispatch(hideModal())
  }

  if (!item) {
    return null
  }
  return (
    <div className='DealDetailsContainer'>
      <SectionTitle>
        {t('deal_details.contract_details')}{item.title}
      </SectionTitle>

      <div className='DealDetailsCard'>
        <div className='DealDetailsStatusContainer'>{t('deal_details.contract_status')}
          <span className='DealDetailsStatusGreen'>
            {item.status}
          </span>
        </div>

        <div>{t('deal_details.contract_members')}</div>
        <div className='DealDetailsMembers'>
          <ItemDetailsMemberCard item={item} user={item.createdBy} />
          <ItemDetailsMemberCard item={item} user={item.member} />
        </div>

        <ItemDetailsForm item={item} />

        {item.status === 'Signed'
          ? <ItemDetailsRatings />
          : ''}
      </div>
      <Modal action={goToContracts} buttonName={t('deal_details.go_to_contracts')} cancelButtonName={t('deal_details.continue_editing')}>
        <img
          alt=''
          src={successIcon}
          width='100'
          height='100'
        />
        <h6>{t('deal_details.saved')}</h6>
        {t('deal_details.contract_successfully_edited_1')} "{item.title}" {t('deal_details.contract_successfully_edited_2')}
      </Modal>
    </div>
  )
}
