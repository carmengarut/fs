import { useSelector, useDispatch } from 'react-redux'
import { hideModal } from '../reducers/modalReducer'
import '../css/modal.css'

function Modal ({ children, displayCancelButton = 'block', cancelButtonName, buttonName, action }) {
  const show = useSelector(state => state.showModal)

  const dispatch = useDispatch()
  return show
    ? (
      <div className='Modal'>
        <div className='ModalInner'>
          {children}
          <button className='ActionButton' onClick={action}>{buttonName}</button>
          <button style={{ display: displayCancelButton }} className='CloseButton' onClick={() => dispatch(hideModal())}>{cancelButtonName}</button>
        </div>

      </div>
      )
    : ''
}

export default Modal
