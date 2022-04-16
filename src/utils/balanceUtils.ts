export function calculateBalance(recharges:any[], trasanctions:any[]){
  const sumOfRecharges = sumOfValues(recharges, "amount")
  const sumOfTransactions = sumOfValues(trasanctions, "amount")

  return sumOfRecharges - sumOfTransactions
}




export function sumOfValues(values: any[], type: string){
  
  const allValues = values.map(value => value[type])
  const sum = allValues.reduce((current, sum) => sum + current, 0)
  return sum
}
