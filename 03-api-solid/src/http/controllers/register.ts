import { z } from 'zod'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerUseCase } from '@/use-case/register.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    await registerUseCase({
        email, name, password
    })
  } catch {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
