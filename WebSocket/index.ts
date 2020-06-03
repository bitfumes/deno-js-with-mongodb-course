import { RouterContext } from "https://deno.land/x/oak/router.ts";
export default async (ctx: RouterContext, next: () => Promise<void>) => {
  console.log(ctx.request.serverRequest);
  await next();
};
