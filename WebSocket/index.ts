import {
  acceptWebSocket,
  acceptable,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";

export default async (ctx: any, next: () => Promise<void>) => {
  const req = ctx.request.serverRequest;
  if (acceptable(req)) {
    const { conn, headers, w: bufWriter, r: bufReader } = req;
    acceptWebSocket({ conn, headers, bufReader, bufWriter }).then(
      async (ws: WebSocket): Promise<void> => {
        console.log("Websocket connection established");
        for await (const event of ws) {
        }
      },
    );
  } else {
    await next();
  }
};
