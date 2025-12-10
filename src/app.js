import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

//Hono Syntax
// specify path
// app.use('/posts/*', cors())
//CORS Middleware
app.use(
  `${process.env.CORS_ORIGIN}`,
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Hono Syntax
app.use("*", async (c, next) => {
  const type = c.req.header("content-type");

  if (type?.includes("application/json")) {
    try {
      c.req.parseBody = await c.req.json();
    } catch {
      c.req.parseBody = {};
    }
  }

  if (type?.includes("application/x-www-form-urlencoded")) {
    c.req.parseBody = await c.req.parseBody();
  }

  await next();
});

export { app };
