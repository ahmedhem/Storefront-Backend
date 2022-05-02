import { Client } from '../database'
import dotenv from 'dotenv'
const bcrypt = require('bcrypt')
export type user = {
  user_id?: number
  firstname: string
  lastname: string
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
  async update(u: user): Promise<number> {
    try {
      const connect = await Client.connect()
      const sql =
        'UPDATE users set  firstname = $1, lastname = $2, password = $3  where user_id = ($4)'
      const hashedPassword = await bcrypt.hash(u.password, 1)
      const result = await connect.query(sql, [u.firstname, u.lastname, hashedPassword, u.user_id])
      connect.release()
      return result.rowCount
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async create(u: user): Promise<user> {
    try {
      const connect = await Client.connect()
      const sql = 'INSERT INTO users( firstName, lastName, password) VALUES($1, $2, $3) returning *'
      const hashedPassword = await bcrypt.hash(u.password, 1)
      const result = await connect.query(sql, [u.firstname, u.lastname, hashedPassword])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('database error')
    }
  }
  async delete(id: number | undefined): Promise<number> {
    try {
      const connect = await Client.connect()
      const sql = 'DELETE FROM users where user_id=($1)'
      const result = await connect.query(sql, [id])
      connect.release()
      return result.rowCount
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async getOne(id: number): Promise<user> {
    try {
      const connect = await Client.connect()
      const sql = 'SELECT * FROM users where user_id=($1)'
      const result = await connect.query(sql, [id])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async authenticate(id: number | undefined, userpassword: string): Promise<user | null> {
    try {
      const connect = await Client.connect()
      const sql = 'SELECT password FROM users WHERE user_id=($1)'
      const result = await connect.query(sql, [id])

      if (result.rows.length) {
        const password: string = result.rows[0].password

        const match = await bcrypt.compare(userpassword as string, password as string)
        if (match) {
          const userInfo = await connect.query(
            'SELECT  firstname, lastname FROM users WHERE user_id=($1)',
            [id]
          )

          connect.release()
          return userInfo.rows[0]
        }
      }
      connect.release()
      return null
    } catch (error) {
      throw new Error(`Unable to login`)
    }
  }
}
