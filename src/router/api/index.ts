import express, { Request, Response, Router } from 'express'
import order from './order/orderController'
import product from './product/productController'
import user from './user/userController'
const routes: Router = express.Router()

routes.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World API'
  })
})

routes.use('/order', order)
routes.use('/product', product)
routes.use('/user', user)

export default routes
