import {AppDataSource} from './db';
import {Todo} from '../model/Todo';

export default class TodoRepository {
    private repository =AppDataSource.getRepository(Todo);

    async createTodo(title: string, message: string): Promise<Todo> {
        const todo = this.repository.create({title, message})
        return  this.repository.save(todo);
    }

    async getAllTodos(orderBy: 'ASC' | 'DESC' = 'ASC'){
        return this.repository.find({
            order:{id:orderBy}
        });
    }

    async getTodoById(id: number) {
        return this.repository.findOne({where: {id}});
    }

    async updateTodo(todo: Todo) {
        return this.repository.save(todo)
    }


    async deleteTodo(id: number) {
        return  this.repository.delete(id);
    }
}
