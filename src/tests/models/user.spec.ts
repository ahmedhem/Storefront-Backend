import { user, User } from '../../models/user'
import { Client } from '../../database'
const bcrypt = require('bcrypt')

describe('User Model', () => {
  beforeAll(async () => {
    await new User().create({
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: '8773'
    })
  })
  afterAll(async () => {
    const connect = await Client.connect()
    const sql = 'DELETE from users'
    await connect.query(sql)
    connect.release()
  })
  it('hashing method is working ', async () => {
    const user: user = await new User().create({
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: '8773'
    })
    const match = await bcrypt.compare('8773', user.password)
    expect(match).toEqual(true)
  })
  it('index method is working ', async () => {
    const users: user[] = await new User().index()
    expect(users.length).toEqual(2)
  })
  it('Create method is working ', async () => {
    const u: user = await new User().create({
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: '8773'
    })
    expect(u).toEqual({
      user_id: u.user_id,
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: u.password
    })
  })
  it('update method is working ', async () => {
    const u: user = await new User().create({
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: '8773'
    })
    expect(
      await new User().update({
        user_id: u.user_id,
        firstname: 'ahmed',
        lastname: 'mohamed',
        password: u.password
      })
    ).toEqual(1)
  })
  it('delete method is working ', async () => {
    const res: user = await new User().create({
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: '8773'
    })
    expect(await new User().delete(res.user_id)).toEqual(1)
  })
})
