import dotenv from 'dotenv'
import { Pool } from 'pg'

import pg from 'pg'
const client = pg.Client

dotenv.config()
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST__DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV } =
  process.env

export let Client: Pool
if (ENV == 'dev') {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })

  const client1 = new client({
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  })
  client1.connect()
} else if (ENV == 'test') {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST__DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  })
}
