import * as businessRepository from "../repositories/businessRepository.js"

export async function getBusinessById(businessId: number) {
  const business = await businessRepository.findById(businessId)

  if(!business){
    throw { type: "not_found", message: "business not found"}
  }
  return business
}

export function checkBusinessTypeAndCardType(businessType: string, cardType: string){
  if(businessType !== cardType){
    throw { type: "conflict", message: "Business and Card type does not match"}
  }
}