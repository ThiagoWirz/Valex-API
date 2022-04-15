import * as companyRepository from "../repositories/companyRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
export async function createCard(employeeId: number, type: string, apiKey: string) {
  
  const existCompany = await companyRepository.findByApiKey(apiKey)
  if(!existCompany){
    throw {type: "not_found", message: "Company not found"}
  }
  const existEmployee = await employeeRepository.findById(employeeId)
  if(!existEmployee){
    throw {type: "not_found", message: "Employee not found"}
  }
}