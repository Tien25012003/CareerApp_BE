import { Router } from "express";
import { getListAccounts } from "../controllers/accounts/getListAccounts";

const accountRouter = Router();

accountRouter.get("/", getListAccounts);

export default accountRouter;
