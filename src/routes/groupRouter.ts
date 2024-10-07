import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getListGroups } from "../controllers/group/getListGroups";
import { createGroup } from "../controllers/group/createGroup";
import { getGroup } from "../controllers/group/getGroup";
import { updateGroup } from "../controllers/group/updateGroup";
import { deleteAccount } from "../controllers/accounts/deleteAccount";

const groupRouter = Router();

groupRouter.get("/all", verifyToken, getListGroups);
groupRouter.post("/", verifyToken, createGroup);
groupRouter.get("/", verifyToken, getGroup);
groupRouter.put("/", verifyToken, updateGroup);
groupRouter.delete("/", verifyToken, deleteAccount);

export default groupRouter;
