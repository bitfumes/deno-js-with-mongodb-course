import { Router } from "https://deno.land/x/oak/mod.ts";
const protectedRouter = new Router();
import token from "../util/token.ts";

protectedRouter.get("/me", (ctx: any) => {
  const authorization = ctx.request.headers.get("authorization");
  const headerToken = authorization.replace("Bearer ", "");
  const payload = token.fetchUserId(headerToken);
  if (payload) {
    console.log(payload.uid);
  }

  ctx.response.body = "I am protected route";
});

export default protectedRouter;
