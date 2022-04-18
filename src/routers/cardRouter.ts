import { Router } from "express"
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import * as cardController from "../controllers/cardController.js"
import cardSchema from "../schemas/cardSchema.js"
import activateCardSchema from "../schemas/activateCardSchema.js"
import passwordSchema from "../schemas/passwordSchema.js"

const cardRouter = Router()

cardRouter.post('/cards',validateSchema(cardSchema), cardController.createCard)
cardRouter.post('/cards/:id/virtual', validateSchema(passwordSchema), cardController.createVirtualCard)
cardRouter.put('/cards/:id/activate', validateSchema(activateCardSchema), cardController.activateCard )
cardRouter.get("/cards/:id", cardController.getBalance)
cardRouter.put("/cards/:id/block", validateSchema(passwordSchema), cardController.blockCard)
cardRouter.put("/cards/:id/unblock", validateSchema(passwordSchema), cardController.unblockCard)
cardRouter.delete('/cards/:id/virtual', validateSchema(passwordSchema), cardController.deleteVirtualCard)

export default cardRouter