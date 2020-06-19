import crypto from 'crypto';
import { IUser } from '../models/User';
import * as userDao from '../daos/user.dao';
import { ICredentials } from '../models/Credentials';


const sha = crypto.createHash('sha512');

export const createUser = async (credentials: ICredentials) => {
    // Validation - (we will skip this)

    // generate salt value
    const salt = generateSalt();

    // calculate hash
    sha.update(credentials.password + salt);
    const hash = sha.digest('hex');

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

const generateSalt = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNNOPQRSTUVWXYZ';
    let salt = '';

    for (let i = 0; i < 40; i++) {
        const index = Math.floor(Math.random() * chars.length);
        salt = salt + chars[index];
    }
    return salt;
}