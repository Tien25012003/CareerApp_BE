import { ObjectId } from "mongoose";
import { TRequest, TResponse } from "../../utils/types/meta";
import { Response } from "express";
import ErrorUtils from "../../utils/constant/Error";
import { ChatBotModel } from "../../models/ChatBot";
export const deletePrompt = async (
  req: TRequest<any, { id: ObjectId }>,
  res: Response<TResponse<void>>
) => {
  try {
    const { id } = req.query;

    const deletedPrompt = await ChatBotModel.findByIdAndDelete(id);
    if (!deletedPrompt) {
      return res.send(ErrorUtils.get("DATA_NOT_FOUND"));
    }
    return res.send({
      code: 200,
      message: "Success",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.send(ErrorUtils.get("SERVER_ERROR"));
  }
};
