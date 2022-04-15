import joi from "joi";

const cardSchema = joi.object({
  employeeId: joi.number().required(),
  type: joi.alternatives('groceries', 'restaurant', 'transport', 'education', 'health')
})

export default cardSchema