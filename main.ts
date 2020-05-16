import { Application, Router } from "https://deno.land/x/oak/mod.ts";
const app = new Application();
const router = new Router();

router.get("/user", (ctx) => {
  const user = { name: "sarthak", email: "sarthak@bitfumes.com" };
  ctx.response.body = user;
});

router.post("/user", async (ctx) => {
  const { value } = await ctx.request.body();
  ctx.response.status = 201;
  ctx.response.body = value;
});
app.use(router.routes());
app.use((ctx) => {
  ctx.response.body = "Hello Deno from OAK";
});
console.log("server is started at http://localhost:4000");
await app.listen({ port: 4000 });
