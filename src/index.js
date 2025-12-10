import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello from server!'))


export default { 
  port: process.env.PORT||3000, 
  fetch: app.fetch, 
} 