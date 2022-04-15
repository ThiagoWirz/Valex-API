import { Router } from "express"
import * as rechargeController from "../controllers/rechargeController.js";
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import rechargeAmountSchema from "../schemas/rechargeAmountSchema";

const rechargeRouter = Router();

rechargeRouter.post("/cards/:id/recharge", validateSchema(rechargeAmountSchema), rechargeController.rechargeCard)

export default rechargeRouter