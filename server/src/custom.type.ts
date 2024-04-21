import 'express';

declare module 'express' {
    export interface Response {
        locals: {
            userId?: string;
            tokenVersion?: number;
        };
    }
}
