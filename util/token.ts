import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

const key = "your-secret";
const payload: Payload = {
  iss: "sarthak",
  exp: setExpiration(new Date().getTime() + 60000),
};
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  generate(): string {
    return makeJwt({ header, payload, key });
  },
};
