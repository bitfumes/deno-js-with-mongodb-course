import db from "../config/databases.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
const userCollection = db.collection("users");
import validation from "../validation.ts";
import hash from "../util/hash.ts";

export default {
  async login(ctx: any) {
    const value = await validation.validateLogin(ctx);
    if (value) {
      const user = await userCollection.findOne({ email: value.email });
      let passwordMatched = false;
      if (user) {
        passwordMatched = hash.verify(user.password, value.password);
      }
      ctx.response.body = passwordMatched;
    }
  },
};
