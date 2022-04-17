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

  const card = cardUtils.formatCardData(employeeId, cardName, type)

  await cardRepository.insert(card);
}

export async function activateCard(cardId: number, securityCode: string, password:string) {

  const card = await checkRegisteredCard(cardId);

  checkIfCardHasPassword(card)

  checkExpirationDate(card.expirationDate)
  
  compareSecurityCode(securityCode, card.securityCode)
 
  const hashPassword = bcrypt.hashSync(password, 10)

  await cardRepository.update(cardId, {password:hashPassword, isBlocked: false})
}

export async function getBalance(cardId: number){
  await checkRegisteredCard(cardId)
  const trasanctions = await paymentRepository.findByCardId(cardId)
  const recharges = await recahargeRepository.findByCardId(cardId)

  const balance = balanceUtils.calculateBalance(recharges, trasanctions)

  return {
    balance, 
    trasanctions,
    recharges
  }
}


export async function checkRegisteredCard(cardId: number){
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