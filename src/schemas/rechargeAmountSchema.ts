import joi from "joi"

const rechargeAmountSchema = joi.object({
  password: joi.number().min(1)
})

export default rechargeAmountSchema