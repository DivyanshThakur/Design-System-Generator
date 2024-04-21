import express from 'express';

/**
 * Async handler to wrap the API routes, allowing for async error handling.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
export const protectedHandler =
    (fn: express.RequestHandler) =>
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
