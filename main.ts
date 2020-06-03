import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import router from "./routes/normal.ts";
import protectedRouter from "./routes/protected.ts";
import notFound from "./404.ts";
import websocket from "./WebSocket/index.ts";
import authMiddleware from "./middleware/auth.ts";
const env = config();

const app = new Application();
const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

app.use(websocket);
app.use(oakCors());
app.use(router.routes());
app.use(protectedRouter.routes());
app.use(notFound);

console.log(`server is started at ${HOST}:${PORT}`);
await app.listen({ port: PORT });
