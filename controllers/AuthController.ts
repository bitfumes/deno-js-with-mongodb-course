import db from "../config/databases.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
const userCollection = db.collection("users");
import validation from "../validation.ts";
import hash from "../util/hash.ts";

export default {
  async login(ctx: any) {
    // validation
    const value = await validation.validateLogin(ctx);
    if (!value) {
      ctx.response.status = 422;
      ctx.response.body = { error: "Please provide required data" };
      return;
    }

    // fetch user
    const user = await userCollection.findOne({ email: value.email });
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = { error: "Credentials doesn't match out record" };
      return;
    }

    // verify password
    const passwordMatched = hash.verify(user.password, value.password);
    if (!passwordMatched) {
      ctx.response.body = { error: "Password is incorrect" };
      return;
    }

    ctx.response.body = user;
  },
};
