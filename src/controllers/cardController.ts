import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
  const {employedId, type} = req.body;
  const apiKey = req.headers["x-api-key"].toString()
}

