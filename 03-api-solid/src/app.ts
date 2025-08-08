import fastiy from 'fastify'
import { PrismaClient } from '../generated/prisma/index.js'

export const app = fastiy()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Breno',
    email: 'breno@gmail.com',
  },
})
