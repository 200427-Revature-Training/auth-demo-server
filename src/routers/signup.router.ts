import { Router } from 'express';
import * as userService from '../services/user.service';
import { ICredentials } from '../models/Credentials';
import { wrap } from '../errors/error-handler';

export const signupRouter = Router();

signupRouter.post('', wrap(async (request, response, next) => {
    const credentials: ICredentials = {
        email: request.body.email,
        password: request.body.password
    }

    userService.createUser(credentials);

    response.sendStatus(201);
    next();
}));
