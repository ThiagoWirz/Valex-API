import {Router} from "express"
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import purchaseSchema from "../schemas/purchaseSchema.js"
import * as purchaseController from "../controllers/purchaseController.js"

const purchaseRouter = Router()

purchaseRouter.post("/purchase/cards/:cardId/businesses/:businessId", validateSchema(purchaseSchema), purchaseController.createPurchase)

export default purchaseRouter