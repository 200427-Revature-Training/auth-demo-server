import { Router, Response, Request } from 'express';
import { wrap } from '../errors/error-handler';
import { ICredentials } from '../models/Credentials';
import * as userService from '../services/user.service'
import jsonwebtoken from 'jsonwebtoken';

export const loginRouter = Router();

loginRouter.get('', wrap(async (request: Request, response, next) => {
    const cookie = request.cookies.token;
    console.log(cookie);
    let payload: any = jsonwebtoken.verify(cookie, 'secret');
    if(typeof payload === 'string') {
        payload = JSON.parse(payload);
    }
    const userId: number = +payload.data.id;
    console.log('Recognized user with id:' + userId);
    const userData = await userService.getUserById(userId);
    response.json(userData);
}));

loginRouter.post('', wrap(async (request, response: Response, next) => {
    console.log('Login request received');
    console.log(request.body);

    const credentials: ICredentials = {
        email: request.body.email,
        password: request.body.password
    };

    const result = await userService.login(credentials);

    const payload = {
        id: result
    };

    console.log(payload);

    jsonwebtoken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload
    }, 'secret', (err, jwt) => {
        console.log(jwt);
        console.log('Writing token to cookie');
        response.cookie('token', jwt, {
            httpOnly: true,
            sameSite: 'lax'
        });
        response.sendStatus(200);
    });

}));