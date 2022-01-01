import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import globalEs from './translations/es/global.json'
import globalEn from './translations/en/global.json'

i18next.init({
  interpolation: { escapeValue: false },
  lng: window.localStorage.getItem('language') || 'es',
  resources: {
    es: {
      global: globalEs
    },
    en: {
      global: globalEn
    }
  }
})

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
