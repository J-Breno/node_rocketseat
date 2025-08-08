import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env/index.js'
import { transactionRoutes } from './routes/transactions.js'

const app = fastify()

app.register(cookie)

app.register(transactionRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
