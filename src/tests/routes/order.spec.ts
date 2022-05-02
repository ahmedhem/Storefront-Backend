import app from '../../server'
import supertest from 'supertest'
import { user, User } from '../../models/user'
import { Client } from '../../database'
import { token } from './user.spec'
import { order, Order } from '../../models/order'

const orderModel = new Order()
const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('Order method validation', async () => {
  let order: order
  let user: user
  let user1: user
  beforeAll(async () => {
    user = await new User().create({
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: '8773'
    })
    user1 = await new User().create({
      firstname: 'yousef',
      lastname: 'magdy',
      password: '1234'
    })
    order = await orderModel.create({
      user_id: user.user_id!,
      order_statue: false,
      Products: []
    })
  })

  afterAll(async () => {
    const connect = await Client.connect()
    const sql = 'DELETE from orders'
    await connect.query(sql)
    connect.release()
  })

  it('should list all orders', async function () {
    const response: supertest.Response = await request
      .get('/api/order/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.length).toBe(1)
  })
  it('should get one order', async function () {
    const response: supertest.Response = await request
      .get(`/api/order/${order.order_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.user_id).toBe(user.user_id)
  })
  it('should create  one order', async function () {
    const response: supertest.Response = await request
      .post('/api/order/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: user1.user_id!,
        order_statue: false,
        Products: []
      })
    expect(response.body.user_id).toBe(user1.user_id)
  })

  it('should update  one order', async function () {
    const response: supertest.Response = await request
      .patch(`/api/order/${order.order_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: order.user_id,
        order_statue: true
      })
    expect(response.body).toBe(1)
  })
  it('should delete  one order', async function () {
    const response: supertest.Response = await request
      .delete('/api/order/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: order.order_id
      })
    expect(response.body).toBe(1)
  })
})
