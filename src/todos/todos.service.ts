import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isNull } from 'common/utils/is-null.util'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateTodoInput } from './dto/create-todo.input'
import { GetTodoArgs } from './dto/get-todo.args'
import { UpdateTodoInput } from './dto/update-todo.input'
import { Todo } from './entities/todo.entity'

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  private getFilter(args: GetTodoArgs): FindManyOptions<Todo> {
    const { done, search } = args

    let filter = null

    if (!isNull(done)) {
      filter = { ...filter, done }
    }

    if (!isNull(search)) {
      filter = {
        ...filter,
        $or: [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
        ],
      }
    }

    return filter
  }

  async findAll(args?: GetTodoArgs): Promise<Todo[]> {
    const todos = this.todoRepository.find(this.getFilter(args))
    return todos
  }

  async findById(id: string): Promise<Todo> {
    return this.todoRepository.findOne(id)
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const todo = new Todo()
    const newTodo = Object.assign(todo, input)
    await this.todoRepository.save(newTodo)
    return todo
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.findById(id)
    const newTodo = Object.assign(todo, input)
    await this.todoRepository.save(newTodo)
    return todo
  }

  async remove(id: string): Promise<string> {
    await this.todoRepository.delete(id)
    return id
  }
}
