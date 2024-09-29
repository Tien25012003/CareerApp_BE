import { Request, Response } from "express";
import { AccountModel } from "../../models/Account";
import ErrorUtils from "../../utils/constant/Error";
import mongoose from "mongoose";

type TParams = {
  id: string; // MongoDB ObjectId is a string
};

export const deleteAccount = async (
  req: Request<any, any, any, TParams>,
  res: Response
) => {
  try {
    const { id } = req.query;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send(ErrorUtils.get("EMPTY_DATA"));
    }

    // Attempt to delete the account by ID
    const deletedAccount = await AccountModel.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).send(ErrorUtils.get("EMPTY_DATA"));
    }

    return res.send({ code: 200, message: "Account successfully deleted" });
  } catch (error) {
    return res.status(500).send(ErrorUtils.get("SERVER_ERROR"));
  }
};
