import joi from "joi"

const onlinePurchaseSchema = joi.object({
  amount: joi.number().min(1),
  securityCode: joi.string(),
  cardNumber: joi.string(),
  expirationDate: joi.string(),
  cardholderName: joi.string()
})

export default onlinePurchaseSchema