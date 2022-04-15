import joi from "joi";

const cardPasswordSchema = joi.object({
  password: joi.string().pattern(/\d{4}/)
})

export default cardPasswordSchema