import * as cardService from "./cardService.js"

export async function createPurchse(cardId: number, businessId: number, password: string, amount: number) {
  const card = await cardService.checkRegisteredCard(cardId)

  cardService.checkExpirationDate(card.expirationDate)
  cardService.checkPassword(password, card.password)
}