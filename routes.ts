import { Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();

router.get("/user", (ctx) => {
  const user = { name: "sarthak", email: "sarthak@bitfumes.com" };
  ctx.response.body = user;
});

router.get("/user/:id", (ctx) => {
  ctx.response.body = ctx.params.id;
});

router.post("/user", async (ctx) => {
  const { value } = await ctx.request.body();
  ctx.response.status = 201;
  ctx.response.body = value;
});

export default router;
