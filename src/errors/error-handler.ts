import { HttpError } from './HttpError';
export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.sendStatus(err.status);
    } else {
        console.log(err);
        res.sendStatus(500);
    }
}

export const wrap = (fn) => (...args) => fn(...args).catch(args[2]);