import { NextFunction, Request, Response } from "express";

export function errorHandler(error, req: Request, res: Response, next: NextFunction){
  if(error.type === "validation_error") return res.status(422).send(error.message);

  console.log(error);
  res.sendStatus(500);
}