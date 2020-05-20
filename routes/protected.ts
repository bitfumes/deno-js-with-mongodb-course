import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
const protectedRouter = new Router();
import token from "../util/token.ts";
import db from "../config/databases.ts";
const userCollection = db.collection("users");

protectedRouter.get("/me", async (ctx: any) => {
  const authorization = ctx.request.headers.get("authorization");
  const headerToken = authorization.replace("Bearer ", "");
  const payload = token.fetchUserId(headerToken);
  if (payload) {
    const uid: string = String(payload.uid);
    const user = await userCollection.findOne({ _id: ObjectId(uid) });
    ctx.response.body = user;
  }
});

export default protectedRouter;
