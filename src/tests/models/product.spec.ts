import { Product, product } from '../../models/product'
import { Client } from '../../database'

describe('Product Model', () => {
  beforeAll(async () => {
    await new Product().create({
      name: 'shoes',
      price: 10
    })
  })
  afterAll(async () => {
    const connect = await Client.connect()
    const sql = 'DELETE from products'
    await connect.query(sql)
    connect.release()
  })
  it('index method is working ', async () => {
    const prod: product[] = await new Product().index()
    expect(prod.length).toEqual(1)
  })
  it('getone method is working ', async () => {
    expect(await new Product().getOne(1)).toEqual({
      product_id: 1,
      name: 'shoes',
      price: 10
    })
  })
  it('Create method is working ', async () => {
    expect(
      await new Product().create({
        name: 'skirt',
        price: 11
      })
    ).toEqual({
      product_id: 2,
      name: 'skirt',
      price: 11
    })
  })
  it('update method is working ', async () => {
    expect(
      await new Product().update({
        product_id: 1,
        name: 'gamed',
        price: 105
      })
    ).toEqual(1)
  })

  it('delete method is working ', async () => {
    const res: product = await new Product().create({
      name: 'shoes',
      price: 10
    })
    expect(await new Product().delete(res.product_id)).toEqual(1)
  })
})
