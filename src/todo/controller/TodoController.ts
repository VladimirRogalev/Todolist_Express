import TodoService from '../service/TodoService';
import UpdateTodoDto from '../dto/UpdateTodoDto';
import {Todo} from '../model/Todo';

export default class TodoController {
    private todoService: TodoService;

    constructor(todoService: TodoService) {
        this.todoService = todoService;
    }

    async createTodo(title: string, message: string) {
        return await this.todoService.createTodo(title, message);
    }

    async getAllTodos(): Promise<Todo[]> {
        return await this.todoService.getAllTodos();
    }

    async updateTodo(id: string, todoDto: UpdateTodoDto): Promise<Todo> {
        return await this.todoService.updateTodo(id, todoDto.title, todoDto.message, todoDto.isCompleted);
    }

    async deleteTodo(id: string): Promise<boolean> {
        return await this.todoService.deleteTodo(id);
    }

    async getAllTodosByStatus(status: boolean): Promise<Todo[]> {
        return await this.todoService.getAllTodosByStatus(status);
    }
}