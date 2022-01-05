
import Notification from './components/Notification'
import Item from './components/Item'
import { useTranslation } from 'react-i18next'

import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import addContractIcon from './public/add-contract-icon.svg'

import './css/items.css'

import SectionTitle from './components/SectionTitle'

function Items () {
  const business = useSelector(state => state.business)
  const items = useSelector(state => state.items)

  const history = useHistory()
  const { t } = useTranslation('global')

  return (
    <div className='i-container'>
      <SectionTitle>
        {t('agreements_page.agreements')}
      </SectionTitle>
      <Notification />
      <div className='i-button-container'>
        <button onClick={() => history.push('/create-item')} className='Button'>{t('agreements_page.new_deal')}</button>
      </div>

      <div className='i-table-header'>
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
      {items.filter(item => {
        if (item.createdBy.id) return (item.createdBy.id === business.id || item.member.id === business.id)
        return (item.createdBy === business.id || item.member.id === business.id)
      }).length > 0
        ? items.filter(item => {
            if (item.createdBy.id) return (item.createdBy.id === business.id || item.member.id === business.id)
            return (item.createdBy === business.id || item.member.id === business.id)
          }).map((item, i) =>
            <Item
              key={i}
              item={item}
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
            <button onClick={() => history.push('/create-item')} className='Button'>{t('agreements_page.new_deal')}</button>
          </div>)}
    </div>
  )
}

export default Items
