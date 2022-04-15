import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response) {
  const {employeeId, type} = req.body;
  const apiKey = req.headers["x-api-key"].toString()
  await cardService.createCard(employeeId, type, apiKey)

  res.sendStatus(201)
}

