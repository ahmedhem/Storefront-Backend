import {Client} from '../database'
import {Product, product} from "./product";

export type order_product = {
    product_id: number;
    quanity:number;
}
export type order_product2 = {
    product_id: number;
    user_id: number;
    quanity:number;
}

export type order = {
    user_id: string;
    statues: boolean;
    Products:order_product[];
}
export class Order {
    async index(): Promise<order[]> {
        try {
            const connect = await Client.connect()
            const orderInfo = 'SELECT * from orders'
            const resultOrder = await connect.query(orderInfo);
            const orderProduct = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)"
            let orders =[];
            for(const o of resultOrder.rows){
                const res= await connect.query(orderProduct, [o.order_id]);
                orders.push({...o, res});
            }
            connect.release()
            return orders;
        } catch (error) {
            throw new Error('database error')
        }
    }
    async create(u: order): Promise<order> {
        try {
            const connect = await Client.connect()
            const sql = 'INSERT INTO orders( user_id, order_statue) VALUES($1, $2, $3) returning *'
            const result = await connect.query(sql, [u.user_id, u.statues]);
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error('database error')
        }
    }
    async delete(id: number): Promise<order> {
        try {
            const connect = await Client.connect()
            const sql = 'DELETE FROM orders where order_id=($1)'
            const result = await connect.query(sql, [id]);
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error('database error')
        }
    }
    async getOne(id: number): Promise<order> {
        try {
            const connect = await Client.connect()
            const sql = 'SELECT * FROM products where id=($1)';
            const orderProduct = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
            const orderInfo = await connect.query(sql, [id]);
            const productInfo = await connect.query(orderProduct, [id]);
            connect.release()
            return {...orderInfo.rows[0], productInfo};
        } catch (error) {
            throw new Error('database error')
        }
    }
    async insertProductToOrder(ordProd: order_product2): Promise<order_product2>{
        try{
            const connect = await Client.connect();
            const sql = 'INSERT INTO  order_products(product_id, order_id, quanity) values ($1, $2, $3)* returning *';
            const newProduct = await connect.query(sql, [ordProd.product_id, ordProd.user_id, ordProd.quanity]);
            connect.release();
            return newProduct.rows[0];
        }catch (error){
            throw new Error('database error')
        }
    }
}
