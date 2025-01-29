import TodoService from './TodoService';
import TodoRepository from '../dao/TodoRepository';
import {Todo} from '../model/Todo';

export default class TodoServiceImpl implements TodoService {
    private todoRepository: TodoRepository;

    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository;
    }

    async createTodo(title: string, message: string): Promise<Todo> {

        return await this.todoRepository.createTodo(title, message);
    }

    async getAllTodos(): Promise<Todo[]> {
        return await this.todoRepository.getAllTodos();
    }

    async updateTodo(id: string, title: string, message: string, isCompleted: boolean): Promise<Todo> {
        const todo = await this.todoRepository.getTodoById(id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        todo.title = title;
        todo.message = message;
        todo.isCompleted = isCompleted;
        return await this.todoRepository.updateTodo(todo);

    }

    async deleteTodo(id: string): Promise<boolean> {
        const todo = await this.todoRepository.getTodoById(id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return !!(await this.todoRepository.deleteTodo(id)).affected;
    }

    async getAllTodosByStatus(status: string): Promise<Todo[]> {
        return await this.todoRepository.getAllTodoByStatus(status !== 'inProcess');
    }


}