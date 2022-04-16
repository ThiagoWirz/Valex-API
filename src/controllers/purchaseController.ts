import { Request, Response } from "express";

export async function createPurchase(req: Request, res: Response) {
  const {cardId, businessId} = req.params
  const {password, amount} = req.body

  res.sendStatus(200)
}