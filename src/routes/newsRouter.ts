import { Router } from "express";
import { getNews } from "../controllers/news/getNews";
const newsRouter = Router();
newsRouter.get("/getNews", getNews);
export default newsRouter;
