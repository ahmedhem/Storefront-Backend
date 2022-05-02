import express, { Router, Request, Response } from 'express'
import { product, Product } from '../../../models/product'
import validateTokenMiddleware from '../../../middlewares/validateAuth'

const product: Router = express.Router()

const prod = new Product()

const index = async (_req: Request, res: Response) => {
  const products = await prod.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
  const product = await prod.getOne(Number(req.params.id))
  res.json(product)
}

const create = async (req: Request, res: Response) => {
  res.set('Content-type', 'application/json')
  try {
    const p: product = {
      name: req.body.name,
      price: req.body.price
    }
    const created = await prod.create(p)
    res.json(created)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const update = async (req: Request, res: Response) => {
  res.set('Content-type', 'application/json')
  try {
    const p: product = {
      product_id: parseInt(req.params.id),
      name: req.body.name,
      price: req.body.price
    }
    const updated = await prod.update(p)
    res.json(updated)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const destroy = async (req: Request, res: Response) => {
  const deleted = await prod.delete(req.body.id)
  res.json(deleted)
}
product.use(validateTokenMiddleware)

product.get('/', index)
product.get('/:id', show)
product.post('/', create)
product.patch('/:id', update)
product.delete('/', destroy)

export default product
