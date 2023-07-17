import { Joi } from "celebrate";

export const validateMongoId = () => {
  const pattern = /^[0-9a-fA-F]{24}$/;
  const message = 'The ID is not a valid MongoDB ObjectId';

  return Joi.string()
    .regex(pattern)
    .required()
    .messages({ 'string.pattern.base': message })
}
