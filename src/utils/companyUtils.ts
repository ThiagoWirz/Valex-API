import * as companyRepository from "../repositories/companyRepository.js"

export async function checkCompany(apiKey:string) {
  const existCompany = await companyRepository.findByApiKey(apiKey)
  if(!existCompany){
    throw {type: "not_found", message: "Company not found"}
  }
}