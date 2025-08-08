import fastiy from 'fastify'
import { appRoutes } from './http/routes.js'

export const app = fastiy()

app.register(appRoutes)
