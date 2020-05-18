import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
  bcrypt(stringToHash: string): string {
    const hash = bcrypt.hashpw(stringToHash);
    return hash;
  },
  verify(hash: string, text: string): boolean {
    const result = bcrypt.checkpw(text, hash);
    return result;
  },
};
