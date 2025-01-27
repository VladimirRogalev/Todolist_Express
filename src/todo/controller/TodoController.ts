import TodoService from '../service/TodoService';
import NewTaskDto from '../dto/NewTaskDto';
import UpdateTaskDto from '../dto/UpdateTaskDto';

export default class TodoController {
    private todoService: TodoService;

    constructor(todoService: TodoService) {
    this.todoService = todoService;
    }

    async createTodo(title: string, message: string) {
        return await this.todoService.createTodo(title, message);
    }

    async getAllTodos() {
        return await this.todoService.getAllTodos();
    }

     async updateTodo(id: number, todoDto: UpdateTaskDto):Promise<NewTaskDto> {
        return  await this.todoService.updateTodo(id, todoDto.title, todoDto.message, todoDto.isCompleted);
    }
}