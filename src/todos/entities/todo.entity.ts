import { ObjectType, Field } from '@nestjs/graphql'
import { Base } from 'common/entities/base.entity'
import { Column, Entity } from 'typeorm'

@ObjectType()
@Entity({ name: 'todos' })
export class Todo extends Base {
  @Field(() => Boolean)
  @Column()
  done!: boolean

  @Field(() => String)
  @Column()
  title!: string

  @Field(() => String)
  @Column()
  description?: string

  constructor() {
    super()
    this.done = false
  }
}
