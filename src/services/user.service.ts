import crypto from 'crypto';
import { IUser } from '../models/User';
import * as userDao from '../daos/user.dao';
import { ICredentials } from '../models/Credentials';
import { HttpError } from '../errors/HttpError';

export const getUserById = async (id: number) => {
    const user = await userDao.getUserById(id);
    return {email: user.email};
}

const calculateHash = (password: string, salt: string) => {
    const sha = crypto.createHash('sha512');
    sha.update(password + salt);
    return sha.digest('hex');
}

export const createUser = async (credentials: ICredentials) => {
    // Validation - (we will skip this)
    
    // generate salt value
    const salt = generateSalt();
    
    // calculate hash
    const hash = calculateHash(credentials.password, salt);

    // store in database
    const user: IUser = {
        id: undefined,
        email: credentials.email,
        salt, hash
    };
    await userDao.createUser(user);
    return true;

    // If this were a more robust system we would send an email to validate
    // them as the email owner
}

export const login = async (credentials: ICredentials) => {
    // Retrieve the user by their e-mail address
    const user: IUser = await userDao.getUserByEmail(credentials.email);

    // calculate hash using stored salt and user provided password
    const hash = calculateHash(credentials.password, user.salt);

    // compare calculated hash to stored hash
    // if hashes match, the user is authenticated, otherwise rejected
    if (hash === user.hash) {
        return user.id;
    } else {
        throw new HttpError(401);
    }

}


const generateSalt = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNNOPQRSTUVWXYZ';
    let salt = '';

    for (let i = 0; i < 40; i++) {
        const index = Math.floor(Math.random() * chars.length);
        salt = salt + chars[index];
    }
    return salt;
}