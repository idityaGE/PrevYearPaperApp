import { Router } from "express";
import { signup, signin } from "../controllers/auth.controllers.js";
const authRouter = Router();
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post('/contact/:id', (req, res) => {
    const { message } = req.body;
});
export default authRouter;
//# sourceMappingURL=userRouter.js.map