import { NextFunction, Request, Response } from "express";
import { Role } from "types";
import { Unauthorized } from "./err/handleErrors.err";

export const checkAuth = async(req: Request, res: Response, next: NextFunction) => {
  if(!req.user) throw new Error("You want to verify the role, without verifying the token first");

  const { role, firstName } = req.user
  if(role !== Role.ADMIN) throw new Unauthorized(`${firstName} not administrator`);

}
