import db from "../config/databases.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
const user = db.collection("users");
import validation from "../validation.ts";
import hash from "../util/hash.ts";

export default {
  async login(ctx: any) {
    const value = await validation.validateLogin(ctx);
    if (value) {
      ctx.response.body = value;
    }
  },
};
