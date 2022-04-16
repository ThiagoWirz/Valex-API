import { Router } from "express"
import * as rechargeController from "../controllers/rechargeController.js";
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import rechargeSchema from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/cards/:id", validateSchema(rechargeSchema), rechargeController.rechargeCard)

export default rechargeRouter