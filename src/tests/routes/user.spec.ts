import app from '../../server'
import supertest from 'supertest'
import { user, User } from '../../models/user'
import { Client } from '../../database'

const userModel = new User()
const request: supertest.SuperTest<supertest.Test> = supertest(app)
export let token: string
describe('User method validation', async () => {
  let user: user
  beforeAll(async () => {
    user = await userModel.create({
      firstname: 'ahmed',
      lastname: 'magdy',
      password: '8773'
    })
  })

  afterAll(async () => {
    const connect = await Client.connect()
    const sql = 'DELETE from users'
    await connect.query(sql)
    connect.release()
  })
  it('should authentication works correctly', async function () {
    const response: supertest.Response = await request
      .post('/api/user/authenticate')
      .set('content-type', 'application/json')
      .send({
        id: user.user_id,
        password: '8773'
      })
    token = response.body.token
    expect(response.status).toEqual(200)
  })
  it('should authentication not works correctly', async function () {
    const response: supertest.Response = await request
      .post('/api/user/authenticate')
      .set('content-type', 'application/json')
      .send({
        id: user.user_id,
        password: '87735'
      })
    expect(response.status).toBe(401)
  })
  it('should list all users', async function () {
    const response: supertest.Response = await request
      .get('/api/user/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.length).toBe(1)
  })
  it('should get one users', async function () {
    const response: supertest.Response = await request
      .get(`/api/user/${user.user_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.firstname).toBe('ahmed')
    expect(response.body.lastname).toBe('magdy')
  })
  it('should create  one users', async function () {
    const response: supertest.Response = await request
      .post('/api/user/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'yousef',
        lastname: 'magdy',
        password: '1234'
      })
    expect(response.body.firstname).toBe('yousef')
    expect(response.body.lastname).toBe('magdy')
  })
  it('should delete  one users', async function () {
    const response: supertest.Response = await request
      .delete('/api/user/')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: user.user_id
      })
    expect(response.body).toBe(1)
  })
})
