import { Router } from "express";
import { getCartsProductViewController } from "../controllers/cartsControllers/getCartsProductViewController.js";


export const cartRouter = Router();

cartRouter.get('/:cid', getCartsProductViewController)