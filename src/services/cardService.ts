import * as companyService from "./companyService.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as cardUtils from "../utils/cardUtils.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as recahargeRepository from "../repositories/rechargeRepository.js"
import * as emplyeeService from "./employeeService.js"
import * as balanceUtils from "../utils/balanceUtils.js"
import bcrypt from "bcrypt"
import dayjs from "dayjs"


export async function createCard(employeeId: number, type: cardRepository.TransactionTypes, apiKey: string) {
  
  await companyService.checkCompany(apiKey)

  const employee =  await emplyeeService.getEmployeeById(employeeId)

  await checkCardTypeAndEmployee(type, employeeId)
  
  const cardName = cardUtils.formatCardName(employee.fullName)

  const cardsNumbers = await cardRepository.getCardNumber()

  const card = cardUtils.formatCardData(employeeId, cardName, type, cardsNumbers)

  await cardRepository.insert(card);
}

export async function activateCard(cardId: number, securityCode: string, password:string) {

  const card = await getCard(cardId);

  checkIfIsVirtual(card.isVirtual)
  checkIfCardHasPassword(card)
  checkExpirationDate(card.expirationDate)
  compareSecurityCode(securityCode, card.securityCode)
 
  const hashPassword = bcrypt.hashSync(password, 10)

  await cardRepository.update(cardId, {password:hashPassword, isBlocked: false})
}

export async function getBalance(cardId: number){
  await getCard(cardId)

  const trasanctions = await paymentRepository.findByCardId(cardId)

  const recharges = await recahargeRepository.findByCardId(cardId)

  const balance = balanceUtils.calculateBalance(recharges, trasanctions)

  return {
    balance, 
    trasanctions,
    recharges
  }
}

export async function blockAndUnblockCard(cardId: number, password: string, isBlocking: boolean) {

  const card = await getCard(cardId)

  checkIfIsVirtual(card.isVirtual)
  checkExpirationDate(card.expirationDate)
  checkBlockedCard(card.isBlocked, isBlocking)
  checkPassword(password, card.password)

  const virtualCards = await cardRepository.findByOriginalCardId(cardId)

  await cardRepository.updateVirtualCards(cardId, {isBlocked: isBlocking})

  await cardRepository.update(cardId, {isBlocked: isBlocking})
}

export async function createVirtualCard(originalCardId: number, password: string){
  const originalCard = await getCard(originalCardId)
  
  checkPassword(password, originalCard.password)

  const cardsNumbers = await cardRepository.getCardNumber()

  const virtualCardData = cardUtils.formatVirtualCard(originalCard, cardsNumbers)

  await cardRepository.insert(virtualCardData)
}

export async function deleteVirtualCard(cardId: number, password: string){
  const card = await getCard(cardId)

  checkIfIsVirtualForCreation(card.isVirtual)
  checkPassword(password, card.password)

  await cardRepository.remove(cardId)
}

export async function getCard(cardId: number){
  const card = await cardRepository.findById(cardId)
  if(!card){
    throw {type: "not_found", message: "Card not Found"}
  }
  return card
}

export function checkExpirationDate(cardDate: string){
  const expirationDate = dayjs(cardDate)
  const today = dayjs(Date.now())

  if(expirationDate.diff(today, "month") > 0){
    throw {type: "forbidden", message: "Card expired"}
  }
}

export function checkPassword(password: string, hashPassword: string){
  if(!bcrypt.compareSync(password, hashPassword)){
    throw {type: "forbidden", message: "Wrong Password"}
  }
}

export async function checkCardTypeAndEmployee(cardType: cardRepository.TransactionTypes, employeeId: number){
  const employeeCard = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId)
  if(employeeCard){
    throw {type: "conflict", message: "Employee cannot register a second card of the same type"}
  }
}

export function checkIfCardHasPassword(card: any){
  if(card.password){
    throw {type: "conflict", message: "Card already activated "}
  }
}

export function compareSecurityCode(securityCode: string, hashSecurityCode: string){
  if(!bcrypt.compareSync(securityCode, hashSecurityCode)){
    throw {type: "forbidden", message: "Security code does not match"}
  }
}

export function checkBlockedCard(isBlocked: boolean, isBlocking: boolean){

  if(isBlocking){
    if(isBlocked){
      throw {type: "bad_request", message: "Card is already blocked"}
    }
  }else if(!isBlocking){
    if(!isBlocked){
      throw {type: "bad_request", message: "Card is already activated"}
    }
  }
}

export function checkBlockedCardForPurchase(isBlocked: boolean){
  if(isBlocked){
    throw {type: "forbidden", message: "Card is blocked"}
  }
}

export async function getCardByDetails(number: string, cardholderName: string, expirationDate: string){
  const card = await cardRepository.findByCardDetails(number, cardholderName, expirationDate)
    if(!card){
      throw {type: "not_found", message: "Card not Found"}
    }
  return card
}

export function checkIfIsVirtualForCreation(isVirtual: boolean){
    if(!isVirtual){
      throw {type: "bad_request", message: "This card is not a virtual card"}
    }
}

export function checkIfIsVirtual(isVirtual: boolean){
  if(isVirtual){
    throw { type: "bad_request", message: "Cannot activate or block a virtual card" }
  }
}


export function determineOriginalCardId(card: any){
  let cardId : number
  if(card.isVirtual){
    cardId = card.originalCardId
  }else{
    cardId = card.id
  }
  return cardId
}

export async function getCards() {
  return await cardRepository.find()
}
