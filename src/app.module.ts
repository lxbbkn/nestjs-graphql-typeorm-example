import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodosModule } from './todos/todos.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'nestjs',
      entities: ['dist/**/*.entity.js'],
      useUnifiedTopology: true,
    }),
    TodosModule,
  ],
})
export class AppModule {}
