import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
const protectedRouter = new Router();
import token from "../util/token.ts";
import db from "../config/databases.ts";
import AuthMiddleware from "../middleware/auth.ts";
const userCollection = db.collection("users");

protectedRouter.options("/me", oakCors());
protectedRouter.get("/me", async (ctx: any) => {
  const headerToken = await AuthMiddleware.authorized(ctx);
  if (!headerToken) return;
  const payload = token.fetchUserId(headerToken);
  if (payload) {
    const uid: string = String(payload.uid);
    const user = await userCollection.findOne({ _id: ObjectId(uid) });
    ctx.response.body = user;
  }
});

export default protectedRouter;
