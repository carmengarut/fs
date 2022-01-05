
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { itemReducer } from './reducers/itemReducer'
import { orderReducer } from './reducers/orderReducer'
import { usersReducer } from './reducers/usersReducers'
import { modalReducer } from './reducers/modalReducer'
import { businessReducer } from './reducers/businessReducer'
import { businessesReducer } from './reducers/businessesReducer'

const reducer = combineReducers({
  items: itemReducer,
  notification: notificationReducer,
  user: userReducer,
  business: businessReducer,
  orders: orderReducer,
  users: usersReducer,
  businesses: businessesReducer,
  showModal: modalReducer
})

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
