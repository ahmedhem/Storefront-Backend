import { Client } from '../database'
import dotenv  from "dotenv";
const bcrypt = require ('bcrypt');
export type user = {
    firstName: string
    lastName: string
    password: string
}
dotenv.config()
export class User {
    async index(): Promise<user[]> {
        try {
            const connect = await Client.connect()
            const sql = 'SELECT * from users'
            const result = await connect.query(sql)
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error('database error')
        }
    }
    async create(u: user): Promise<user> {
        try {
            const connect = await Client.connect()
            const sql = 'INSERT INTO users( firstName, lastName, password) VALUES($1, $2, $3) returning *';
            const hashedPassword:string = bcrypt.genSalt(process.env["SALT_ROUNDS"], function(err:string, salt: string) {
                bcrypt.hash(u.password, salt, function(err :string, hash:string) {
                    return hash;
                });
            });
            const result = await connect.query(sql, [ u.firstName, u.lastName, hashedPassword]);
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error('database error')
        }
    }
    async delete(id: number): Promise<user> {
        try {
            const connect = await Client.connect()
            const sql = 'DELETE FROM users where id=($1)'
            const result = await connect.query(sql, [id]);
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error('database error')
        }
    }
    async getOne(id: number): Promise<user> {
        try {
            const connect = await Client.connect()
            const sql = 'SELECT * FROM users where id=($1)'
            const result = await connect.query(sql, [id]);
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error('database error')
        }
    }
}
