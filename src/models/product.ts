import { Client } from '../database'

export type product = {
  product_id?: number
  name: string
  price: number
}
export class Product {
  async index(): Promise<product[]> {
    try {
      const connect = await Client.connect()
      const sql = 'SELECT * from products'
      const result = await connect.query(sql)
      connect.release()
      return result.rows
    } catch (error) {
      throw new Error('database error')
    }
  }
  async create(u: product): Promise<product> {
    try {
      const connect = await Client.connect()
      const sql = 'INSERT INTO products( name, price) VALUES( $1, $2) returning *'
      const result = await connect.query(sql, [u.name, u.price])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('database error')
    }
  }
  async update(p: product): Promise<number> {
    try {
      const connect = await Client.connect()
      const sql = 'UPDATE products set  name = $1, price = $2  where product_id = ($3)'
      const result = await connect.query(sql, [p.name, p.price, p.product_id])
      connect.release()
      return result.rowCount
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async delete(id: number | undefined): Promise<number> {
    try {
      const connect = await Client.connect()
      const sql = 'DELETE FROM products where product_id=($1)'
      const result = await connect.query(sql, [id])
      connect.release()
      return result.rowCount
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async getOne(id: number): Promise<product> {
    try {
      const connect = await Client.connect()
      const sql = 'SELECT * FROM products where product_id=($1)'
      const result = await connect.query(sql, [id])
      connect.release()

      return result.rows[0]
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
}
