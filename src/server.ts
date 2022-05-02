import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import routes from './router/api'

dotenv.config()

const PORT = process.env.PORT || 3000
const app: Application = express()
app.use(morgan('short'))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api', routes)
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍 Magdy'
  })
})

app.listen(PORT)

export default app
