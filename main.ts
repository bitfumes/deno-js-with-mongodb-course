import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import router from "./routes.ts";
import notFound from "./404.ts";
const env = config();

const app = new Application();
const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

app.use(router.routes());
app.use(async (ctx: any, next) => {
  const authorization = ctx.request.headers.get("authorization");
  if (!authorization) {
    await next();
    return;
  }
  const token = authorization.replace("Bearer ", "");
  // validate token

  // handle invalide or no token
});
app.use(notFound);

console.log(`server is started at ${HOST}:${PORT}`);
await app.listen({ port: PORT });
