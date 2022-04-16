import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt" 
import dayjs from "dayjs"
import * as cardRepository from "../repositories/cardRepository.js"

export function formatCardName(employeeName: string){
    const fullName = employeeName.split(" ");
    const cardName = [] 
    fullName.forEach((name: string, index: number) => {
      if(index === 0 || index === fullName.length -1){
        cardName.push(name)
      }
      else if(name.length > 2){
        cardName.push(name[0])
      }
    })
  return cardName.join(" ").toUpperCase()
}

export function formatCardData(employeeId: number, cardName: string, type: cardRepository.TransactionTypes){
  const card: cardRepository.CardInsertData = {
    employeeId,
    number: faker.finance.creditCardNumber("MasterCard"),
    cardholderName: cardName,
    securityCode: bcrypt.hashSync(faker.finance.creditCardCVV(), 10),
    expirationDate: dayjs(Date.now()).add(5, "year").format("MM/YY"),
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: true,
    type
  }
  return card
}
