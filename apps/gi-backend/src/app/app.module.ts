import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { JwtStrategy } from './jwt.strategy'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'my-32-character-ultra-secure-and-ultra-long-secret',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // NOTE: nestjs can also auto generate the schema file using decorators, might make thing easier? see `autoSchemaFile`
      typePaths: ['./**/*.graphql'],
      context: ({ req }: any) => {
        req
      },
      definitions: {
        path: join(process.cwd(), 'apps/gi-backend/src/app/graphql_gen.ts'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
