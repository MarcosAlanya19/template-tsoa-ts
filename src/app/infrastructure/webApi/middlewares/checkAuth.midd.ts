import { User } from "@entities/user.entity";
import { verifyToken } from "@helpers/jwt.helper";
import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "./err/handleErrors.err";

export const checkAuth = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

  // Verificar si el token existe
  if(!token) throw new Unauthorized("Not authorized, no token");
  // Verificar si el token es correcto
  const { _id } = verifyToken(token);
  // Verificar que el usuario exista
  const user = await User.findById(_id).select('-password -token -__v');
  if(!user) throw new Unauthorized('Not authorized, token failed')
  if(!user.status) throw new Unauthorized('Not authorized, token failed')
  // Incrusta el usuario en un req global
  req.user = user;
  next();
}
