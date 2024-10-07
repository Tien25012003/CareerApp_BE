import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getListGroups } from "../controllers/group/getListGroups";

const groupRouter = Router();

groupRouter.get("/all", verifyToken, getListGroups);

export default groupRouter;
