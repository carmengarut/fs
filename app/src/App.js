import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { userSet } from './reducers/userReducer'
import Header from './components/Header'
import RouterApp from './RouterApp'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import LandingPage from './LandingPage'
import HeaderWeb from './components/HeaderWeb'
import { itemInit } from './reducers/itemReducer'
import { orderInit } from './reducers/orderReducer'
import { usersInit } from './reducers/usersReducers'
import BusinessLoginForm from './components/BusinessLoginForm'
import BusinessRegistrationForm from './components/BusinessRegistrationForm'
import { businessSet } from './reducers/businessReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const business = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const loggedBusinessJSON = window.localStorage.getItem('loggedBusiness')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      dispatch(userSet(userToSet))
    }

    if (loggedBusinessJSON) {
      const businessToSet = JSON.parse(loggedBusinessJSON)
      dispatch(businessSet(businessToSet))
    }

    dispatch(itemInit())
    dispatch(orderInit())
    dispatch(usersInit())
  }, [])

  return (
    <BrowserRouter>
      {(user.email || business.email)
        ? (
          <>
            <Header />
            <RouterApp />
          </>)
        : (
          <>
            <HeaderWeb />
            <Switch>

              <Route path='/login'>
                <LoginForm />
              </Route>

              <Route path='/login-business'>
                <BusinessLoginForm />
              </Route>

              <Route path='/register'>
                <RegistrationForm />
              </Route>

              <Route path='/register-business'>
                <BusinessRegistrationForm />
              </Route>

              <Route path='/business'>
                <LandingPage />
              </Route>

              <Route path='/'>
                <LandingPage />
              </Route>
            </Switch>
          </>
          )}
    </BrowserRouter>
  )
}

export default App
