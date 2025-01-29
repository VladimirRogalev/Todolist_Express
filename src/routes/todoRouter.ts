import {Router} from 'express';
import expressAsyncHandler from 'express-async-handler';
import NewTodoDto from '../todo/dto/NewTodoDto';
import TodoController from '../todo/controller/TodoController';
import TodoServiceImpl from '../todo/service/TodoServiceImpl';
import TodoRepository from '../todo/dao/TodoRepository';
import {body, param} from 'express-validator';
import validationMiddleware from '../todo/middleware/validationMiddleware';
import UpdateTodoDto from '../todo/dto/UpdateTodoDto';
import {Todo} from '../todo/model/Todo';


const router = Router();

//Todo for controller, service, bd?
const todoRepository = new TodoRepository();
const todoService = new TodoServiceImpl(todoRepository);
const todoController = new TodoController(todoService);


router.post('',
    body('title').isString().notEmpty(),
    body('message').isString().notEmpty(),
    validationMiddleware,
    expressAsyncHandler(async (req, res) => {
        const newTodo = req.body as NewTodoDto;
        const createTodo = await todoController.createTodo(newTodo.title, newTodo.message);
        res.status(200).json(createTodo);
        //newTodo.title
    }));

router.get('', expressAsyncHandler(async (req, res) => {
    const allTodos = await todoController.getAllTodos();
    res.status(200).json(allTodos);
}));
router.put('/:id',
    validationMiddleware,
    expressAsyncHandler
    (async (req, res) => {
        const id = req.params.id;
        const todoDto = req.body as UpdateTodoDto;
        const todo: Todo = await todoController.updateTodo(id, todoDto);
        if (todo) {
            res.status(200).send(todo);
        } else {
            throw new Error(`Todo id: ${id} was not found`);
        }
    }));
router.delete('/:id', param('id').isInt().notEmpty(), validationMiddleware, expressAsyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result: boolean = await todoController.deleteTodo(id);
    res.status(200).send(result);


}));

router.get('/:status',
    validationMiddleware,
    expressAsyncHandler
    (async (req, res) => {
        const status = !!req.params.status;
        const todos = await todoController.getAllTodosByStatus(status);
        res.status(200).send(todos);

    }));

export default router;