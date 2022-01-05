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

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      dispatch(userSet(userToSet))
    }

    dispatch(itemInit())
    dispatch(orderInit())
    dispatch(usersInit())
  }, [])

  return (
    <BrowserRouter>
      {user.email
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
                <LoginForm />
              </Route>

              <Route path='/register'>
                <RegistrationForm />
              </Route>

              <Route path='/register-business'>
                <RegistrationForm />
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
