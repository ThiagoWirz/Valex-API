import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseServices.js"

export async function createPurchase(req: Request, res: Response) {
  const {cardId, businessId} = req.params
  const {password, amount} = req.body

  await purchaseService.createPurchase(parseInt(cardId), parseInt(businessId), password, amount)

  res.sendStatus(200)
}

export async function onlinePurchase(req: Request, res: Response) {
  const {businessId} = req.params
  const {cardNumber, cardholderName, expirationDate, securityCode, amount} = req.body

  await purchaseService.onlinePurchase(parseInt(businessId), cardNumber, cardholderName, expirationDate, securityCode, amount)

  res.sendStatus(200)
}