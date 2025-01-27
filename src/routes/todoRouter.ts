import {Router} from 'express';
import expressAsyncHandler from 'express-async-handler';
import NewTaskDto from '../todo/dto/NewTaskDto';
import TodoController from '../todo/controller/TodoController';
import TodoServiceImpl from '../todo/service/TodoServiceImpl';
import TodoRepository from '../todo/dao/TodoRepository';
import {body, param} from 'express-validator';
import validationMiddleware from '../todo/middleware/validationMiddleware';
import UpdateTaskDto from '../todo/dto/UpdateTaskDto';


const router = Router();

//Todo for controller, service, bd?
const todoRepository = new TodoRepository();
const todoService = new TodoServiceImpl(todoRepository);
const todoController = new TodoController(todoService);


router.post('',
    body("title").isString().notEmpty(),
    body('message').isString().notEmpty(),
    validationMiddleware,
    expressAsyncHandler (async  (req, res) => {
    const newTodo = req.body as NewTaskDto;
    const createTodo = await todoController.createTodo(newTodo.title, newTodo.message);
    res.status(200).json(createTodo);
    //newTodo.title
} ))

router.get('', expressAsyncHandler(async (req, res) => {
    const todos = await todoController.getAllTodos();
    res.status(200).json(todos)
}));
router.put('/:id',
    param('id').isInt().notEmpty(),
    validationMiddleware,
    async (req, res) => {
        const id = +req.params.id;
        const todoDto = req.body as UpdateTaskDto;
        const todo: NewTaskDto = await todoController.updateTodo(id, todoDto);
        if (todo) {
            res.status(200).send(todo)
        } else {
            throw new Error(`Todo id: ${id} was not found`);
        }
    })

export default router;