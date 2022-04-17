import { Router } from "express"
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import * as cardController from "../controllers/cardController.js"
import cardSchema from "../schemas/cardSchema.js"
import activateCardSchema from "../schemas/activateCardSchema.js"
import passwordSchema from "../schemas/passwordSchema.js"

const cardRouter = Router()

cardRouter.post('/cards',validateSchema(cardSchema), cardController.createCard)
cardRouter.put('/cards/:id/activate', validateSchema(activateCardSchema), cardController.activateCard )
cardRouter.get("/cards/:id", cardController.getBalance)
cardRouter.put("/cards/:id/block", validateSchema(passwordSchema), cardController.blockCard)

export default cardRouter