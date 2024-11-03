import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";

type TParams = {
  email: string; // MongoDB ObjectId is a string
};

export const deletePrivacyAccount = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { email } = req.query;

    // Attempt to delete the account by ID
    const deletedAccount = await AccountModel.findByIdAndDelete(email);

    if (!deletedAccount) {
      return res.status(404).send(ErrorUtils.get("EMPTY_DATA"));
    }

    return res.send({ code: 200, message: "Account successfully deleted" });
  } catch (error) {
    return res.status(500).send(ErrorUtils.get("SERVER_ERROR"));
  }
};
