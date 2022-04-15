import { NextFunction, Request, Response } from "express";

export function errorHandler(error, req: Request, res: Response, next: NextFunction){
  console.log(error);
  if(error.type === "validation_error") return res.status(422).send(error.message);
  if(error.type === "not_found") return res.status(404).send(error.message);
  if(error.type === "conflict") return res.status(409).send(error.message);
  if(error.type === "forbidden") return res.status(403).send(error.message)

  res.sendStatus(500);
}