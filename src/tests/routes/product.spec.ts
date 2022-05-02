import app from '../../server'
import supertest from 'supertest'
import { Client } from '../../database'
import { product, Product } from '../../models/product'
import { token } from './user.spec'

const productModel = new Product()
const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('Product method validation', async () => {
  let product: product
  beforeAll(async () => {
    product = await productModel.create({
      name: 'car',
      price: 1234
    })
  })

  afterAll(async () => {
    const connect = await Client.connect()
    const sql = 'DELETE from products'
    await connect.query(sql)
    connect.release()
  })

  it('should list all products', async function () {
    const response: supertest.Response = await request
      .get('/api/product/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.length).toBe(1)
  })
  it('should get one product', async function () {
    const response: supertest.Response = await request
      .get(`/api/product/${product.product_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.name).toBe('car')
    expect(response.body.price).toBe(1234)
  })
  it('should create  one product', async function () {
    const response: supertest.Response = await request
      .post('/api/product/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'game',
        price: 456
      })
    expect(response.body.name).toBe('game')
    expect(response.body.price).toBe(456)
  })
  it('should update  one order', async function () {
    const response: supertest.Response = await request
      .patch(`/api/product/${product.product_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        product_id: product.product_id,
        name: 'newName',
        price: 123456
      })
    expect(response.body).toBe(1)
  })
  it('should delete  one product', async function () {
    const response: supertest.Response = await request
      .delete('/api/product/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: product.product_id
      })
    expect(response.body).toBe(1)
  })
})
