import { Order, order } from '../../models/order'
import { User } from '../../models/user'
import { Client } from '../../database'

describe('Order Model', () => {
  beforeAll(async () => {
    await new User().create({
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: '8773'
    })
    await new Order().create({
      user_id: 3,
      order_statue: false,
      Products: []
    })
  })
  afterAll(async () => {
    const connect = await Client.connect()
    const sql2 = 'DELETE from orders'
    await connect.query(sql2)
    const sql = 'DELETE from users'
    await connect.query(sql)
    connect.release()
  })
  it('index method is working ', async () => {
    const ord: order[] = await new Order().index()
    expect(ord.length).toEqual(1)
  })
  it('Create method is working ', async () => {
    const ord: order = await new Order().create({
      user_id: 3,
      order_statue: true,
      Products: []
    })

    expect(ord).toEqual({
      order_id: 2,
      user_id: 3,
      order_statue: true
    })
  })
  it('getOne method is working ', async () => {
    expect(await new Order().getOne(1)).toEqual({
      order_id: 1,
      user_id: 3,
      order_statue: false
    })
  })
  it('update method is working ', async () => {
    expect(await new Order().update({ order_id: 1, user_id: 3, order_statue: false })).toEqual(1)
  })

  it('delete method is working ', async () => {
    expect(await new Order().delete(1)).toEqual(1)
  })
})
