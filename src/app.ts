import express, {Application} from 'express';
import {initDB} from './todo/dao/db';
import todoRouter from './routes/todoRouter';

const PORT = 8080;
// const HOST = 'http://localhost:'

const app: Application = express();

app.use(express.json());

app.use('/todos', todoRouter);

// app.use((err:Error, req: Request, res: Response, next: NextFunction)=> {
//     console.log(err.message);
//     res.status(400).json({error: err.message});
// })
async function startServer() {
    await initDB();

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });

}

startServer().catch(console.error);
