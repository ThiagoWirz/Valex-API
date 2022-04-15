import { Router } from "express"
import { rechargeCard } from "../controllers/rechargeController.js";
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import rechargeAmountSchema from "../schemas/rechargeAmountSchema";

const rechargeRouter = Router();

rechargeRouter.post("/cards/:id/recharge", validateSchema(rechargeAmountSchema), rechargeCard)

export default rechargeRouter