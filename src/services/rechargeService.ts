import * as companyUtils from "../utils/companyUtils.js"

export async function rechargeCard(cardId: number, amount: number, apiKey:string) {
  
  await companyUtils.checkCompany(apiKey)
}