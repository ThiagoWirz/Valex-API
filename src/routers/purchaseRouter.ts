import {Router} from "express"
import {validateSchema} from "../middlewares/validateSchemaMiddleware.js"
import purchaseSchema from "../schemas/purchaseSchema.js"

const purchaseRouter = Router()

purchaseRouter.post("/purchase/cards/:cardId/businesses/:businessesId", validateSchema(purchaseSchema))

export default purchaseRouter