import express, { Router, Request, Response } from 'express'
import { user, User } from '../../../models/user'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import validateTokenMiddleware from '../../../middlewares/validateAuth'

const user: Router = express.Router()
dotenv.config()
const userModel = new User()
const index = async (_req: Request, res: Response) => {
  const users = await userModel.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = await userModel.getOne(Number(req.params.id))
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  res.set('Content-type', 'application/json')
  try {
    const p: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
    const created = await userModel.create(p)
    res.json(created)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const update = async (req: Request, res: Response) => {
  res.set('Content-type', 'application/json')
  try {
    const p: user = {
      user_id: parseInt(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
    const updated = await userModel.update(p)
    res.json(updated)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const destroy = async (req: Request, res: Response) => {
  const deleted = await userModel.delete(req.body.id)
  res.json(deleted)
}
const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await userModel.authenticate(req.body.id, req.body.password)
    if (user === null) {
      return res.status(401).json({
        status: 'error',
        message: 'the username and password do not match please try again'
      })
    }
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as unknown as string)

    res.status(200)
    res.json({ user, token })
  } catch (error) {
    res.status(401)
    res.send('unauthorized user' + error)
  }
}

user.get('/', index, validateTokenMiddleware)
user.get('/:id', show, validateTokenMiddleware)
user.post('/', create, validateTokenMiddleware)
user.patch('/:id', update, validateTokenMiddleware)
user.post('/authenticate', authenticate)
user.delete('/', destroy, validateTokenMiddleware)

export default user
