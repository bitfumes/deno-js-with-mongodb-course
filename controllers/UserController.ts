export default {
  index(ctx: any) {
    const user = { name: "sarthak", email: "sarthak@bitfumes.com" };
    ctx.response.body = user;
  },
  show(ctx: any) {
    ctx.response.body = ctx.params.id;
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
