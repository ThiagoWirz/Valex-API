import * as companyService from "./companyService.js"
import * as cardService from "./cardService.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function rechargeCard(cardId: number, amount: number, apiKey:string) {
  
  await companyService.checkCompany(apiKey)
  const card = await cardService.checkRegisteredCard(cardId)
  cardService.checkExpirationDate(card.expirationDate)

  await rechargeRepository.insert({cardId, amount})

}