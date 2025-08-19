import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserService } from './create-user.service';
import { UserController } from './user.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserService, PrismaService],
})
export class UserModule {}
