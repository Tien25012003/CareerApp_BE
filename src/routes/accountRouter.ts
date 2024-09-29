import { Router } from "express";
import { getListAccounts } from "../controllers/accounts/getListAccounts";
import { getAccount } from "../controllers/accounts/getAccount";
import { createAccount } from "../controllers/accounts/createAccount";
import { updateStatusAccount } from "../controllers/accounts/updateAccountStatus";
import { updateInfoAccount } from "../controllers/accounts/updateAccountInfo";
import { deleteAccount } from "../controllers/accounts/deleteAccount";
const accountRouter = Router();

accountRouter.get("/all", getListAccounts);
accountRouter.get("/", getAccount);
accountRouter.post("/", createAccount);
accountRouter.put("/status", updateStatusAccount);
accountRouter.put("/info", updateInfoAccount);
accountRouter.delete("/", deleteAccount);

export default accountRouter;
