import type { CheckIn, Prisma } from '../../generated/prisma/index.js'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
