// https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/
import { useState, useEffect } from 'react'
import FontAwesome from 'react-fontawesome'
import '../css/dropdown.css'
export default function Dropdown ({ title, list, resetThenSet }) {
  const [isListOpen, setIsListOpen] = useState(false)
  const [headerTitle, setHeaderTitle] = useState(title)

  useEffect(() => {
    if (isListOpen) {
      setTimeout(() => {
        window.addEventListener('click', close)
      }, 0)
    } else {
      setTimeout(() => {
        window.removeEventListener('click', close)
      }, 0)
    }
  }, [isListOpen])
  const toggleList = () => {
    if (isListOpen) {
      setIsListOpen(false)
    } else {
      setIsListOpen(true)
    }
  }
  const selectItem = item => {
    const { title, id, key } = item

    setHeaderTitle(title)
    setIsListOpen(false)

    setTimeout(() => {
      window.removeEventListener('click', close)
    }, 1)

    resetThenSet(id, key)
  }

  const close = () => {
    setIsListOpen(false)

    window.removeEventListener('click', close)
  }

  return (
    <div>

      <div className='d-header' onClick={toggleList}>{headerTitle}{isListOpen
        ? <FontAwesome name='angle-up' size='2x' />
        : <FontAwesome name='angle-down' size='2x' />}
      </div>

      {isListOpen && (
        <div
          role='list'
          className='d-list'
        >
          {list.map(item => (
            <div
              type='button'
              className='d-list-item'
              key={item.id}
              onClick={() => selectItem(item)}
            >
              {item.title}
              {' '}
              {item.selected && <FontAwesome name='check' />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
