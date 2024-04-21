import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config();

import generalConfig from './config/general.config';
import helmet from 'helmet';
import cors from 'cors';
import appRouter from './routers';
import connectDB from './utils/db';

const app = express();

connectDB();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(
    cors({
        origin: generalConfig.ALLOWED_DOMAINS,
        credentials: true,
    }),
);

app.use('/api', appRouter);

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Namaste From Identity API' });
});

app.listen(generalConfig.PORT, () =>
    console.log('Server running on port', generalConfig.PORT),
);
