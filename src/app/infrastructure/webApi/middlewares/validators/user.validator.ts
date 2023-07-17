import { validateMongoId } from "@utils/validators.utils";
import { Joi, Segments, celebrate } from "celebrate";

export const createUserValidator = celebrate({
  [Segments.BODY]:  Joi.object({
    commerceId:     validateMongoId(),
    services:       Joi.array().items(validateMongoId()).default([]),
    firstName:      Joi.string().required(),
    secondName:     Joi.string().required(),
    firstLastname:  Joi.string().required(),
    secondLastname: Joi.string().required(),
    username:       Joi.string().required(),
    email:          Joi.string().email().required(),
    password:       Joi.string().required(),
    avatar:         Joi.object({
      url:          Joi.string().required(),
      publicId:     Joi.string().required(),
    }),
    cellphone:      Joi.number().min(0).max(99999999999).required(),
    role:           Joi.string().default('CUSTOMER'),
  }),
});

export const loginUserValidator = celebrate({
  [Segments.BODY]:  Joi.object({
    email:          Joi.string().email().required(),
    password:       Joi.string().required(),
  }),
})
