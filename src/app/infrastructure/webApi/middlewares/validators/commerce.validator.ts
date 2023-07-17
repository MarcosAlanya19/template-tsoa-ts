import { CreateCommerceDto } from "@dtos/commerce.dto";
import { Joi, Segments, celebrate } from "celebrate";

export const CreateCommerceValidator = celebrate({
  [Segments.BODY]: Joi.object<CreateCommerceDto>().keys({
    name:           Joi.string().trim().required(),
    type:           Joi.string().trim().required(),
    address:        Joi.object({
      country:      Joi.string().trim().required(),
      city:         Joi.string().trim().required(),
      street:       Joi.string().trim().required(),
      zipCode:      Joi.number().required(),
    }).required(),
    schedule:       Joi.array().items(Joi.string()).default([]),
  }),
})

export const GetByIdCommerceValidator = celebrate({
  [Segments.PARAMS]: {
    commerceId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
      'string.pattern.base': 'The ID is not a MongoId',
    }),
  },
})
