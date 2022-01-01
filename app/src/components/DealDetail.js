
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'
import SectionTitle from './SectionTitle'
import DealDetailsMemberCard from './DealDetailsMemberCard'
import DealDetailsForm from './DealDetailsForm'
import DealDetailsRatings from './DealDetailsRatings'

import { hideModal } from '../reducers/modalReducer'

import successIcon from '../public/success-icon.svg'

import '../css/dealDetails.css'
export default function DealDetailsHello () {
  const deals = useSelector(state => state.deals)

  const { id } = useParams()

  const deal = deals.find(deal => deal.id === id.toString())

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  const goToContracts = () => {
    history.push('/deals')
    dispatch(hideModal())
  }

  if (!deal) {
    return null
  }
  return (
    <div className='DealDetailsContainer'>
      <SectionTitle>
        {t('deal_details.contract_details')}{deal.title}
      </SectionTitle>

      <div className='DealDetailsCard'>
        <div className='DealDetailsStatusContainer'>{t('deal_details.contract_status')}
          <span className='DealDetailsStatusGreen'>
            {deal.status}
          </span>
        </div>

        <div>{t('deal_details.contract_members')}</div>
        <div className='DealDetailsMembers'>
          <DealDetailsMemberCard deal={deal} user={deal.createdBy} />
          <DealDetailsMemberCard deal={deal} user={deal.member} />
        </div>

        <DealDetailsForm deal={deal} />

        {deal.status === 'Signed'
          ? <DealDetailsRatings />
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
        {t('deal_details.contract_successfully_edited_1')} "{deal.title}" {t('deal_details.contract_successfully_edited_2')}
      </Modal>
    </div>
  )
}
