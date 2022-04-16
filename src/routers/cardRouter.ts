import { Router } from "express"
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import * as cardController from "../controllers/cardController.js"
import cardSchema from "../schemas/cardSchema.js"
import activateCardSchema from "../schemas/activateCardSchema.js"

const cardRouter = Router()

cardRouter.post('/cards',validateSchema(cardSchema), cardController.createCard)
cardRouter.put('/cards/:id/activate', validateSchema(activateCardSchema), cardController.activateCard )

export default cardRouter