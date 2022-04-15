import * as companyUtils from "../utils/companyUtils.js"
import * as cardUtils from "../utils/cardUtils.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function rechargeCard(cardId: number, amount: number, apiKey:string) {
  
  await companyUtils.checkCompany(apiKey)
  const card = await cardUtils.checkRegisteredCard(cardId)
  cardUtils.checkExpirationDate(card.expirationDate)

  await rechargeRepository.insert({cardId, amount})

}