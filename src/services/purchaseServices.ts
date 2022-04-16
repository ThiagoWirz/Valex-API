import * as cardService from "./cardService.js"
import * as businessRepository from "../repositories/businessRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"

export async function createPurchase(cardId: number, businessId: number, password: string, amount: number) {
  const card = await cardService.checkRegisteredCard(cardId)

  cardService.checkExpirationDate(card.expirationDate)
  cardService.checkPassword(password, card.password)

  const business = await businessRepository.findById(businessId)

  if(!business){
    throw { type: "not_found", message: "business not found"}
  }

  if(business.type !== card.type){
    throw { type: "conflict", message: "Business and Card type does not match"}
  }

  const cardBalance = await cardService.getBalance(cardId)

  if(cardBalance.balance < amount){
    throw {type: "forbidden", message: "You don't have the amount in your balance"}
  }

  await paymentRepository.insert({cardId, businessId, amount})
}