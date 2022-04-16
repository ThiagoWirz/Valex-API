import joi from "joi";

const activateCardSchema = joi.object({
  securityCode: joi.string(),
  password: joi.string().pattern(/\d{4}/)
})

export default activateCardSchema