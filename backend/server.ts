import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express from 'express';
import { getRoutes } from './routes/routes';
import { connectionOptions } from './ormconfig';
import { getAuthRoutes } from './routes/authRoutes';

createConnection(connectionOptions).then(() => {
    
    const app = express();

    app.use(express.json());
    app.use('/api', getRoutes());
    app.use('/auth', getAuthRoutes());

    app.listen(3000, () => console.log('Successfully listening on 3000 ...'));
    
}).catch(error => console.log(error));


