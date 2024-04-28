import generalConfig from '../config/general.config.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const notFound = (req: any, _res: any, next: any) => {
    const error = new ErrorResponse(`Not Found - ${req.originalUrl}`, 404);
    next(error);
};

export const errorHandler = (err: any, _req: any, res: any, _next: any) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error',
        stack: generalConfig.NODE_ENV === 'production' ? null : err.stack,
    });
};
