import { Field, ObjectType, ID } from '@nestjs/graphql'
import {
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType({ isAbstract: true })
@Entity()
export abstract class Base {
  @Field(() => ID)
  @ObjectIdColumn()
  readonly _id!: ObjectID

  @Field(() => Date)
  @CreateDateColumn()
  readonly createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date
}
