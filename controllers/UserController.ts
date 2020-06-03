import db from "../config/databases.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
const user = db.collection("users");
import validation from "../validation.ts";
import hash from "../util/hash.ts";

export default {
  async index(ctx: any) {
    const data = await user.find();
    ctx.response.body = data;
  },
  async show(ctx: any) {
    try {
      const data = await user.findOne({ _id: ObjectId(ctx.params.id) });
      ctx.response.body = data;
    } catch (e) {
      ctx.response.status = 404;
      ctx.response.body = { error: "User does't exists in our database." };
    }
  },
  async store(ctx: any) {
    const value = await validation.validate(ctx);
    if (value) {
      value.created_at = parseInt((new Date().getTime() / 1000).toString());
      value.password = await hash.bcrypt(value.password);
      const insertId = await user.insertOne(value);
      ctx.response.status = 201;
      ctx.response.body = insertId;
    }
  },
  async update(ctx: any) {
    const value = await validation.validateUpdate(ctx);
    if (value) {
      const data = {
        email: value.email,
        name: value.name,
        password: value.password,
      };
      try {
        await user.updateOne({ _id: ObjectId(ctx.params.id) }, { $set: data });
        ctx.response.status = 200;
        ctx.response.body = { message: "updated" };
      } catch (e) {
        ctx.response.status = 404;
        ctx.response.body = { error: "User does't exists in our database." };
      }
    }
  },
  async destroy(ctx: any) {
    try {
      await user.deleteOne({ _id: ObjectId(ctx.params.id) });
      ctx.response.status = 204; // no content
    } catch (e) {
      ctx.response.status = 404;
      ctx.response.body = { error: "User does't exists in our database." };
    }
  },
};
