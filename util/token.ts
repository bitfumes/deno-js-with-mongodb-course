import {
  validateJwt,
  parseAndDecode,
  validateJwtObject,
} from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

const key = "your-secret";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  generate(userId: string): string {
    const payload: Payload = {
      uid: userId,
      exp: setExpiration(new Date().getTime() + 60000 * 60),
    };
    return makeJwt({ header, payload, key });
  },
  async validate(token: string) {
    return !!await validateJwt(token, key, { isThrowing: false });
  },
  fetchUserId(token: string) {
    return validateJwtObject(parseAndDecode(token)).payload;
  },
};
