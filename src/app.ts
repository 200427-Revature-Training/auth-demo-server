import express from 'express';
import { loginRouter } from './routers/login.router';
import { signupRouter } from './routers/signup.router';
import { errorHandler } from './errors/error-handler';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/signup', signupRouter)

app.use(errorHandler);

app.listen(3005, () => {
    console.log('App running at http://localhost:3005');
})

