import joi from "joi"

const passwordSchema = joi.object({
  password: joi.string().pattern(/\d{4}/)
})

export default passwordSchema