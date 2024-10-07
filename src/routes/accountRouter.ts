import { Router } from "express";
import { getListAccounts } from "../controllers/accounts/getListAccounts";
import { getAccount } from "../controllers/accounts/getAccount";
import { createAccount } from "../controllers/accounts/createAccount";
import { updateStatusAccount } from "../controllers/accounts/updateAccountStatus";
import { updateInfoAccount } from "../controllers/accounts/updateAccountInfo";
import { deleteAccount } from "../controllers/accounts/deleteAccount";
import { verifyAccount } from "../controllers/accounts/verifyAccount";
import { login } from "../controllers/accounts/login";
import { logout } from "../controllers/accounts/logout";
import { verifyToken } from "../middlewares/verifyToken";
import { getAccessToken } from "../controllers/accounts/getAccessToken";
const accountRouter = Router();

accountRouter.get("/all", verifyToken, getListAccounts);
accountRouter.get("/", verifyToken, getAccount);
accountRouter.post("/", createAccount);
accountRouter.put("/status", verifyToken, updateStatusAccount);
accountRouter.put("/info", verifyToken, updateInfoAccount);
accountRouter.delete("/", verifyToken, deleteAccount);
accountRouter.get("/verify", verifyAccount);
accountRouter.post("/login", login);
accountRouter.post("/logout", logout);
accountRouter.get("/accessToken", getAccessToken);

export default accountRouter;
