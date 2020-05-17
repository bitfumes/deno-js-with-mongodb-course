import db from "../config/databases.ts";
const user = db.collection("users");

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
    const { value } = await ctx.request.body();
    ctx.response.status = 201;
    ctx.response.body = value;
  },
  update(ctx: any) {
  },
  destroy(ctx: any) {
  },
};
