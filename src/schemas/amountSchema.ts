import joi from "joi"

const amountSchema = joi.object({
  password: joi.number().min(1)
})

export default amountSchema