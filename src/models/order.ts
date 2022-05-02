import { Client } from '../database'

export type order_product = {
  product_id: number
  quanity: number
}
export type order_product2 = {
  product_id: number
  user_id: number
  quanity: number
}

export type order = {
  order_id?: number
  user_id: number
  order_statue: boolean
  Products?: order_product[]
}
export class Order {
  async index(): Promise<order[]> {
    try {
      const connect = await Client.connect()
      const orderInfo = 'SELECT * from orders'
      const resultOrder = await connect.query(orderInfo)
      const orderProduct = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)'
      const orders = []
      for (const o of resultOrder.rows) {
        const res = await connect.query(orderProduct, [o.order_id])
        orders.push({ ...o, ...res.rows })
      }
      connect.release()
      return orders
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async create(u: order): Promise<order> {
    try {
      const connect = await Client.connect()
      const sql = 'INSERT INTO orders( user_id, order_statue) VALUES($1, $2) returning *'
      const result = await connect.query(sql, [u.user_id, u.order_statue])
      connect.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async update(u: order): Promise<number> {
    try {
      const connect = await Client.connect()
      const sql = 'UPDATE orders set user_id = $1, order_statue = $2  where order_id = ($3)'
      const result = await connect.query(sql, [u.user_id, u.order_statue, u.order_id])
      connect.release()
      return result.rowCount
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async delete(id: number): Promise<number> {
    try {
      const connect = await Client.connect()
      const sql = 'DELETE FROM orders where order_id=($1)'
      const result = await connect.query(sql, [id])
      connect.release()
      return result.rowCount
    } catch (error) {
      throw new Error('database error')
    }
  }
  async getOne(id: number): Promise<order> {
    try {
      const connect = await Client.connect()
      const sql = 'SELECT * FROM orders where order_id=($1)'
      const orderProduct = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)'
      const orderInfo = await connect.query(sql, [id])
      const productInfo = await connect.query(orderProduct, [id])
      connect.release()
      return { ...orderInfo.rows[0], ...productInfo.rows[0] }
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
  async insertProductToOrder(ordProd: order_product2): Promise<order_product2> {
    try {
      const connect = await Client.connect()
      const sql =
        'INSERT INTO  orders_products(product_id, order_id, quantity) values ($1, $2, $3) returning *'
      const newProduct = await connect.query(sql, [
        ordProd.product_id,
        ordProd.user_id,
        ordProd.quanity
      ])
      connect.release()
      return newProduct.rows[0]
    } catch (error) {
      throw new Error('database error' + error)
    }
  }
}
