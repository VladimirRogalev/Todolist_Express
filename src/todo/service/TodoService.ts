import {Todo} from '../model/Todo';
import NewTaskDto from '../dto/NewTaskDto';

export default interface TodoService{

    createTodo(title: string, message: string): Promise<Todo>

    getAllTodos(): Promise<Todo[]>;

    updateTodo(id: number, title: string, message: string, isCompleted: boolean): Promise<Todo>;

    deleteTodo(id: number): Promise<boolean>;

    getAllTodosByStatus(status: boolean): Promise<Todo[]>;
}