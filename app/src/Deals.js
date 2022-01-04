
import Notification from './components/Notification'
import Deal from './components/Deal'
import { useTranslation } from 'react-i18next'

import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import addContractIcon from './public/add-contract-icon.svg'

import './css/deals.css'

import SectionTitle from './components/SectionTitle'

function Deals () {
  const user = useSelector(state => state.user)
  const deals = useSelector(state => state.deals)

  const history = useHistory()
  const { t } = useTranslation('global')

  return (
    <div className='DealsContainer'>
      <SectionTitle>
        {t('agreements_page.agreements')}
      </SectionTitle>
      <Notification />
      <div className='ButtonContainer'>
        <button onClick={() => history.push('/create-deal')} className='Button'>{t('agreements_page.new_deal')}</button>
      </div>

      <div className='TableHeader'>
        <div className='ColumnTitleDeal'>{t('agreements_page.title')}</div>
        <div className='Columns2TitleContainer'>
          <div className='ColumnTitle'>{t('agreements_page.user')}</div>
          <div className='ColumnTitle'>{t('agreements_page.creation_date')}</div>
        </div>
        <div className='BatchesTitleContainer'>
          <div className='ColumnTitle'>{t('agreements_page.signed')}</div>
          <div className='ColumnTitle'>{t('agreements_page.status')}</div>
        </div>
      </div>
      {deals.filter(deal => {
        if (deal.createdBy.id) return (deal.createdBy.id === user.id || deal.member.id === user.id)
        return (deal.createdBy === user.id || deal.member.id === user.id)
      }).length > 0
        ? deals.filter(deal => {
            if (deal.createdBy.id) return (deal.createdBy.id === user.id || deal.member.id === user.id)
            return (deal.createdBy === user.id || deal.member.id === user.id)
          }).map((deal, i) =>
            <Deal
              key={i}
              deal={deal}
            />
          )
        : (
          <div className='D-no-deals-container'>
            <img
              alt=''
              src={addContractIcon}
              width='100'
              height='100'
            />
            <div className='D-no-deals-text'>{t('agreements_page.no_deals')}</div>
            <button onClick={() => history.push('/create-deal')} className='Button'>{t('agreements_page.new_deal')}</button>
          </div>)}
    </div>
  )
}

export default Deals
