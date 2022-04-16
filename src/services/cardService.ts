import * as companyService from "./companyService.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as cardUtils from "../utils/cardUtils.js"
import bcrypt from "bcrypt"
import dayjs from "dayjs"


export async function createCard(employeeId: number, type: cardRepository.TransactionTypes, apiKey: string) {
  
  await companyService.checkCompany(apiKey)

  const employee = await employeeRepository.findById(employeeId)
  if(!employee){
    throw {type: "not_found", message: "Employee not found"}
  }
  const employeeCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
  if(employeeCard){
    throw {type: "conflict", message: "Employee cannot register a second card of the same type"}
  }
  const cardName = cardUtils.formatCardName(employee.fullName)


  const card = cardUtils.formatCardData(employeeId, cardName, type)

  await cardRepository.insert(card);
}

export async function activateCard(cardId: number, securityCode: string, password:string) {

  const card = await checkRegisteredCard(cardId);

  if(card.password){
    throw {type: "conflict", message: "Card already activated "}
  }

  checkExpirationDate(card.expirationDate)
  console.log(securityCode)
  if(!bcrypt.compareSync(securityCode, card.securityCode)){
    throw {type: "forbidden", message: "Security code does not match"}
  }

  const hashPassword = bcrypt.hashSync(password, 10)

  await cardRepository.update(cardId, {password:hashPassword, isBlocked: false})
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
