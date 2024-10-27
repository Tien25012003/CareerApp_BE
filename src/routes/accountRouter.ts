import { Router } from "express";
import { createAccount } from "../controllers/accounts/createAccount";
import { deleteAccount } from "../controllers/accounts/deleteAccount";
import { getAccessToken } from "../controllers/accounts/getAccessToken";
import { getAccount } from "../controllers/accounts/getAccount";
import { getListAccounts } from "../controllers/accounts/getListAccounts";
import { login } from "../controllers/accounts/login";
import { logout } from "../controllers/accounts/logout";
import { updateInfoAccount } from "../controllers/accounts/updateAccountInfo";
import { updateStatusAccount } from "../controllers/accounts/updateAccountStatus";
import { verifyAccount } from "../controllers/accounts/verifyAccount";
import { verifyToken } from "../middlewares/verifyToken";
import { loginWithSocial } from "../controllers/accounts/loginWithSocial";
const accountRouter = Router();

accountRouter.get("/all", verifyToken, getListAccounts);
accountRouter.get("/", verifyToken, getAccount);
accountRouter.post("/", createAccount);
accountRouter.put("/status", verifyToken, updateStatusAccount);
accountRouter.put("/info", verifyToken, updateInfoAccount);
accountRouter.delete("/", verifyToken, deleteAccount);
accountRouter.get("/verify", verifyAccount);
accountRouter.post("/login", login);
accountRouter.post("/loginWithSocial", loginWithSocial);
accountRouter.post("/logout", logout);
accountRouter.get("/accessToken", getAccessToken);

export default accountRouter;
