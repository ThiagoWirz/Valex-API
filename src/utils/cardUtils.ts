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

export function formatCardData(employeeId: number, cardName: string, type: cardRepository.TransactionTypes, cardsNumbers: any[]){
  
  const number = generateUniqueCardNumber(cardsNumbers)
  const CVV = faker.finance.creditCardCVV()
  console.log(CVV)

  const card: cardRepository.CardInsertData = {
    employeeId,
    number,
    cardholderName: cardName,
    securityCode: bcrypt.hashSync(CVV, 10),
    expirationDate: dayjs(Date.now()).add(5, "year").format("MM/YY"),
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: true,
    type
  }
  return card
}

export function formatVirtualCard(originalCard: any, cardsNumbers: any[]){
  const number = generateUniqueCardNumber(cardsNumbers)
  const CVV = faker.finance.creditCardCVV()
  console.log(CVV)

  const virtualCard: cardRepository.CardInsertData = {
    employeeId: originalCard.employeeId,
    number,
    cardholderName: originalCard.cardholderName,
    securityCode: bcrypt.hashSync(CVV, 10),
    expirationDate: dayjs(Date.now()).add(5, "year").format("MM/YY"),
    password: originalCard.password,
    isVirtual: true,
    originalCardId: originalCard.id,
    isBlocked: false,
    type: originalCard.type
  }
  return virtualCard
}

export function generateUniqueCardNumber(allCardsNumbers: any[]){
  let number = faker.finance.creditCardNumber("MasterCard")
  while(allCardsNumbers.includes(number)){
    number = faker.finance.creditCardNumber("MasterCard")
  }
  return number
}