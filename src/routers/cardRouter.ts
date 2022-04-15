import { Router } from "express"
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import * as cardController from "../controllers/cardController.js"
import cardSchema from "../schemas/cardSchema.js"

const cardRouter = Router()

cardRouter.post('/cards',validateSchema(cardSchema), cardController.createCard)

export default cardRouter