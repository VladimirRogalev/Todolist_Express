import TodoService from './TodoService';
import TodoRepository from '../dao/TodoRepository';
import {Todo} from '../model/Todo';
import NewTaskDto from '../dto/NewTaskDto';

export default class  TodoServiceImpl implements TodoService {
    private todoRepository: TodoRepository;

    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository;
    }

    async createTodo(title: string, message: string): Promise<Todo> {
        const todo =  await this.todoRepository.createTodo(title, message);
        return todo;
    }

    async getAllTodos(): Promise<Todo[]> {
        return await this.todoRepository.getAllTodos();
    }

    async updateTodo(id: number, title: string, message: string, isCompleted: boolean): Promise<NewTaskDto> {
        const todo = await this.todoRepository.getTodoById(id);
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        todo.title = title;
        todo.message = message;
        todo.isCompleted = isCompleted;
        // const updateTodo = await this.todoRepository.updateTodo(todo);
        return await this.todoRepository.updateTodo(todo) ;
    }



}