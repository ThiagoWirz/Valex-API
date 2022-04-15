import { Router } from "express"
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import * as cardController from "../controllers/cardController.js"
import cardSchema from "../schemas/cardSchema.js"
import cardPasswordSchema from "../schemas/cardPasswordSchema.js"

const cardRouter = Router()

cardRouter.post('/cards',validateSchema(cardSchema), cardController.createCard)
cardRouter.put('/cards/activate', validateSchema(cardPasswordSchema), )

export default cardRouter