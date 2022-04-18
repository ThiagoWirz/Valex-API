import * as cardService from "./cardService.js"
import * as businessService from "./businessService.js"
import * as paymentRepository from "../repositories/paymentRepository.js"

export async function createPurchase(cardId: number, businessId: number, password: string, amount: number) {
  const card = await cardService.getCard(cardId)

  cardService.checkBlockedCardForPurchase(card.isBlocked)
  cardService.checkIfIsVirtual(card.isVirtual, "posPurchase")
  cardService.checkExpirationDate(card.expirationDate)
  cardService.checkPassword(password, card.password)

  const business = await businessService.getBusinessById(businessId)

  businessService.checkBusinessTypeAndCardType(business.type, card.type)

  const cardBalance = await cardService.getBalance(cardId)

  checkIfCardHasAmount(cardBalance.balance, amount)
  
  await paymentRepository.insert({cardId, businessId, amount})
}

export async function onlinePurchase(businessId: number, cardNumber: string, cardholderName: string, expirationDate: string, securityCode: string, amount: number ) {

  const card = await cardService.getCardByDetails(cardNumber, cardholderName, expirationDate)

  const cardId =  cardService.determineOriginalCardId(card)
  
  cardService.compareSecurityCode(securityCode, card.securityCode)
  cardService.checkExpirationDate(expirationDate)
  cardService.checkBlockedCardForPurchase(card.isBlocked)

  const business = await businessService.getBusinessById(businessId)

  businessService.checkBusinessTypeAndCardType(business.type, card.type)

  const cardBalance = await cardService.getBalance(cardId)

  checkIfCardHasAmount(cardBalance.balance, amount)

  await paymentRepository.insert({cardId, businessId, amount})
}

export function checkIfCardHasAmount(balance: number, amount:number){
  if(balance < amount){
    throw {type: "forbidden", message: "You don't have the amount in your balance"}
  }
}