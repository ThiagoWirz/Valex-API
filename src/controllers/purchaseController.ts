import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseServices.js"

export async function createPurchase(req: Request, res: Response) {
  const {cardId, businessId} = req.params
  const {password, amount} = req.body

  await purchaseService.createPurchase(parseInt(cardId), parseInt(businessId), password, amount)

  res.sendStatus(200)
}