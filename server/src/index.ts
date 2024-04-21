import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

import generalConfig from './config/general.config';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './utils/db';

const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(
    cors({
        credentials: true,
        origin: generalConfig.ALLOWED_DOMAINS,
    }),
);

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Namaste From Covrzy API' });
});

app.listen(generalConfig.PORT, () =>
    console.log('Server running on port', generalConfig.PORT),
);
