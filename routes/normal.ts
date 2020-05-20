import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "../controllers/UserController.ts";
import AuthController from "../controllers/AuthController.ts";
const router = new Router();

router.get("/user", UserController.index)
  .get("/user/:id", UserController.show)
  .post("/user", UserController.store)
  .patch("/user/:id", UserController.update)
  .delete("/user/:id", UserController.destroy);

router.post("/login", AuthController.login);

export default router;
