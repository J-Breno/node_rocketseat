import { Module } from '@nestjs/common'
import { PrismaService } from './database/prisma/prisma.service.js'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module.js'
import { envSchema } from './env.js'
import { HttpModule } from './http/http.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],

  providers: [PrismaService],
})
export class AppModule {}
