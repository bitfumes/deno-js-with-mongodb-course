import token from "../util/token.ts";
export default {
  async authorized(ctx: any) {
    const authorization = ctx.request.headers.get("authorization");
    if (!authorization) {
      ctx.response.status = 401; // unauthorised
      ctx.response.body = { error: "Unauthorized" };
      return false;
    }
    const headerToken = authorization.replace("Bearer ", "");
    // validate token
    const isTokenValid = await token.validate(headerToken);
    if (!isTokenValid) {
      ctx.response.status = 401; // unauthorised
      ctx.response.body = { error: "Unauthorized" };
      return false;
    }

    return headerToken;
  },
};
