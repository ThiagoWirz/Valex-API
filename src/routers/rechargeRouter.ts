import { Router } from "express"
import * as rechargeController from "../controllers/rechargeController.js";
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import amountSchema from "../schemas/amountSchema.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/cards/:id", validateSchema(amountSchema), rechargeController.rechargeCard)

export default rechargeRouter