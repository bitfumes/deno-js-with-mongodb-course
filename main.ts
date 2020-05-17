import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
const app = new Application();
app.use(router.routes());
app.use((ctx) => {
  ctx.response.body = "Hello Deno from OAK";
});
console.log("server is started at http://localhost:4000");
await app.listen({ port: 4000 });
