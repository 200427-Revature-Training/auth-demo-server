import { IUser } from '../models/User'
import { db } from '../daos/db'
import { HttpError } from '../errors/HttpError';

export const createUser = async (user: IUser) => {
    const sql = `INSERT INTO auth_users (email, salt, hash) VALUES \
($1, $2, $3)`
    
    const result = await db.query(sql, [user.email, user.salt, user.hash]);
    return true;
}

export const getUserByEmail = async (email: string) => {
    const sql = `SELECT * FROM auth_users WHERE email = $1`;
    const result = await db.query<IUser>(sql, [email]);
    return result.rows[0];
}

export const getUserById = async (id: number) => {
    try {
        const sql = `SELECT * FROM auth_users WHERE id = $1`;
        const result = await db.query<IUser>(sql, [id]);
        return result.rows[0];
    } catch(err) {
        throw new HttpError(500);
    }
}
