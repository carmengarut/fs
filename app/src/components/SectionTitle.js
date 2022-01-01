import dealsIcon from '../public/deals-icon.svg'

import '../css/sectionTitle.css'

export default function SectionTitle ({ children }) {
  return (
    <div className='SectionTitleContainer'>
      <img
        alt=''
        src={dealsIcon}
        width='30px'
        height='30px'
      />
      <h1 className='SectionTitle'>{children}</h1>
    </div>
  )
}
