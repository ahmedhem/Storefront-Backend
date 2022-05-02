import { User } from '../../models/user'
import { Client } from '../../database'

const userModel = new User()
describe('Authentication is implemented', async () => {
  it('except auth function to be defined', () => {
    expect(userModel.authenticate).toBeDefined()
  })
  afterAll(async () => {
    const connect = await Client.connect()
    const sql = 'DELETE from users'
    await connect.query(sql)
    connect.release()
  })
  it('except auth function to return authenticated user', async () => {
    const userTest = await userModel.create({
      firstname: 'ahmed',
      lastname: 'magdy',
      password: '8773'
    })
    const authenticated_user = await userModel.authenticate(userTest.user_id, '8773')
    expect(authenticated_user?.firstname).toEqual(userTest.firstname)
    expect(authenticated_user?.lastname).toEqual(userTest.lastname)
  })

  it('except auth function to return Unauthenticated user', async () => {
    const userTest = await userModel.create({
      firstname: 'ahmed',
      lastname: 'asdsad',
      password: '8773'
    })
    const authenticated_user = await userModel.authenticate(userTest.user_id, 'wrongpassword')
    expect(authenticated_user).toEqual(null)
  })
})
