import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js"

export async function rechargeCard(req: Request, res: Response) {
  const {id} = req.params
  const {amount} = req.body
  const apiKey = req.headers["x-api-key"].toString()

  await rechargeService.rechargeCard(parseInt(id), amount, apiKey)

  res.sendStatus(200)
}