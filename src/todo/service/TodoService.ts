import {Todo} from '../model/Todo';
import NewTodoDto from '../dto/NewTodoDto';

export default interface TodoService{

    createTodo(title: string, message: string): Promise<Todo>

    getAllTodos(): Promise<Todo[]>;

    updateTodo(id: string, title: string, message: string, isCompleted: boolean): Promise<Todo>;

    deleteTodo(id: string): Promise<boolean>;

    getAllTodosByStatus(status: string): Promise<Todo[]>;
}