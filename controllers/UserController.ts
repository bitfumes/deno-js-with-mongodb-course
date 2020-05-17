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
    if (!ctx.request.hasBody) {
      ctx.response.status = 400; // bad request
      ctx.response.body = { error: "Please provide the required data" };
      return;
    }
    const { value } = await ctx.request.body();
    if (!value.email) {
      ctx.response.status = 422; // unprocessable entity
      ctx.response.body = {
        error: { message: "Email field is required" },
      };
      return;
    }
    if (!value.name) {
      ctx.response.status = 422; // unprocessable entity
      ctx.response.body = {
        error: { message: "Name field is required" },
      };
      return;
    }
    if (!value.password) {
      ctx.response.status = 422; // unprocessable entity
      ctx.response.body = {
        error: { message: "Password field is required" },
      };
      return;
    }
    const insertId = await user.insertOne(value);
    ctx.response.status = 201;
    ctx.response.body = insertId;
  },
  async update(ctx: any) {
    if (!ctx.request.hasBody) {
      ctx.response.status = 400; // bad request
      ctx.response.body = { error: "Please provide the required data" };
      return;
    }
    const { value } = await ctx.request.body();
    const data = {email : value.email,name:value.name,password:value.password};
    await user.updateOne(
      { _id: { $oid: ctx.params.id } },
      { $set: data },
    );
    ctx.response.status = 200;
    ctx.response.body = { message: "updated" };
  },
  async destroy(ctx: any) {
    await user.deleteOne({ _id: { $oid: ctx.params.id } });
    ctx.response.status = 204; // no content
  },
};
