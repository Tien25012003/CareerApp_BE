import { Router } from "express";
import { getNews } from "../controllers/news/getNews";
import { addNews } from "../controllers/news/addNews";
import { deleteNews } from "../controllers/news/deleteNews";
import { updateNews } from "../controllers/news/updateNews";
const newsRouter = Router();
newsRouter.get("/getNews", getNews);
newsRouter.post("/addNews", addNews);
newsRouter.delete("/deleteNews", deleteNews);
newsRouter.put("/updateNew", updateNews);
export default newsRouter;