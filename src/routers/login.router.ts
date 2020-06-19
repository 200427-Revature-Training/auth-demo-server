import { Router } from 'express';
import { wrap } from '../errors/error-handler';

export const loginRouter = Router();

loginRouter.post('', wrap((request, response, next) => {
    response.json({message: 'login'})
}));