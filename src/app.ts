import express from 'express';
import { loginRouter } from './routers/login.router';
import { signupRouter } from './routers/signup.router';
import { errorHandler } from './errors/error-handler';
import cookieParser from 'cookie-parser';

const app = express();

// CORS middleware
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Headers', 'content-type')
    res.set('Access-Control-Allow-Credentials', 'true');

    next();
});

app.use(express.json());
app.use(cookieParser());

app.use('/login', loginRouter);
app.use('/signup', signupRouter)

app.use(errorHandler);

app.get('/logout', (request, response, next) => {
    response.clearCookie('token');
    response.sendStatus(200);
});

app.listen(3005, () => {
    console.log('App running at http://localhost:3005');
})

