import express from 'express';
import jwt from 'jsonwebtoken';
import generalConfig from '../config/general.config';

const authMiddleware = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized Access');
        }
        jwt.verify(token, generalConfig.REFRESH_TOKEN_SECRET, (err) => {
            if (err) {
                return res.status(403).send('Unauthorized Access!');
            }

            const decodedData: any = jwt.decode(token);
            res.locals.tokenVersion = decodedData.tokenVersion;
            res.locals.userId = decodedData.id;

            next();
        });
    } catch (error) {
        return res.status(500).send('Something went wrong');
    }
};

export default authMiddleware;
