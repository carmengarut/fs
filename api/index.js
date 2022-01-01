require('dotenv').config()
require('./mongo.js') // Esto ejecuta el fichero de mongo.js

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const app = express()

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const dealsRouter = require('./controllers/deals')
const ratingsRouter = require('./controllers/ratings.js')

// app.use(express.urlencoded({extended: true})); 
app.use(cors())
app.use(express.json())
app.use(logger)

app.use(express.static('public'))
app.use('/login', express.static('public'))
app.use('/register', express.static('public'))
app.use('/deals', express.static('public'))
app.use('/users', express.static('public'))
app.use('/profile', express.static('public'))

Sentry.init({
  dsn: 'https://d67d64d4595c432683cc5e9ade2e8a5a@o1037870.ingest.sentry.io/6006005',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use('/api/deals', dealsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/ratings', ratingsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(notFound)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
