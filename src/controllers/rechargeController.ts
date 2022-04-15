import { Request, Response } from "express";

export async function rechargeCard(req: Request, res: Response) {
  const {id} = req.params
  const {amount} = req.body
  const apiKey = req.headers["x-api-key"].toString()
}