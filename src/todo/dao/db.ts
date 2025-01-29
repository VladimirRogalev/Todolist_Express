// import {DataSource} from 'typeorm';
import {DataSource} from 'typeorm';
import {Todo} from '../model/Todo';
import 'dotenv/config'


export const  AppDataSource = new DataSource({
   type: 'mongodb',
    url: process.env.DATABASE_URL,
    entities: [Todo],
    synchronize: true,
    useUnifiedTopology:true,

})

export async function initDB() {
    try {
        await AppDataSource.initialize();
        console.log("Done!");
    }
    catch (e) {
        console.error("Error: " + e);
    }
}