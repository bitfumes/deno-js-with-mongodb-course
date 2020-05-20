import { Router } from "https://deno.land/x/oak/mod.ts";
const protectedRouter = new Router();

protectedRouter.get("/me", (ctx: any) => {
  ctx.response.body = "I am protected route";
});

export default protectedRouter;
