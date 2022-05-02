import express, { Request, Response, Router } from 'express'
import { Order, order, order_product2 } from '../../../models/order'
import validateTokenMiddleware from '../../../middlewares/validateAuth'

const order: Router = express.Router()

const orderModel = new Order()
const index = async (_req: Request, res: Response) => {
  const users = await orderModel.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = await orderModel.getOne(Number(req.params.id))
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  res.set('Content-type', 'application/json')
  try {
    const p: order = {
      user_id: req.body.user_id,
      order_statue: req.body.order_statue
    }
    const created = await orderModel.create(p)
    res.json(created)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const update = async (req: Request, res: Response) => {
  res.set('Content-type', 'application/json')
  try {
    const p: order = {
      order_id: parseInt(req.params.id),
      user_id: req.body.user_id,
      order_statue: req.body.order_statue
    }
    const updated = await orderModel.update(p)
    res.json(updated)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addProduct = async (req: Request, res: Response) => {
  res.set('Content-type', 'application/json')
  try {
    const p: order_product2 = {
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quanity: req.body.quanity
    }
    const created = await orderModel.insertProductToOrder(p)
    res.json(created)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await orderModel.delete(req.body.id)
  res.json(deleted)
}
order.use(validateTokenMiddleware)

order.get('/', index)
order.get('/:id', show)
order.post('/', create)
order.patch('/:id', update)
order.post('/add_product', addProduct)
order.delete('/', destroy)

export default order
