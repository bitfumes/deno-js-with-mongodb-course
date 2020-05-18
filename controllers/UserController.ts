import db from "../config/databases.ts";
const user = db.collection("users");
import validation from "../validation.ts";
export default {
  async index(ctx: any) {
    const data = await user.find();
    ctx.response.body = data;
  },
  async show(ctx: any) {
    const data = await user.findOne(
      { _id: { $oid: ctx.params.id } },
    );
    ctx.response.body = data;
  },
  async store(ctx: any) {
    const value = await validation.validate(ctx);
    if (value) {
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
      await user.updateOne(
        { _id: { $oid: ctx.params.id } },
        { $set: data },
      );
      ctx.response.status = 200;
      ctx.response.body = { message: "updated" };
    }
  },
  async destroy(ctx: any) {
    await user.deleteOne({ _id: { $oid: ctx.params.id } });
    ctx.response.status = 204; // no content
  },
};
