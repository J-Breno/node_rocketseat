import { Module } from '@nestjs/common'
import { PrismaService } from './database/prisma/prisma.service.js'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module.js'
import { HttpModule } from './http/http.module.js'
import { EnvModule } from './env/env.module.js'
import { envSchema } from './env/env.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],

  providers: [PrismaService],
})
export class AppModule {}
