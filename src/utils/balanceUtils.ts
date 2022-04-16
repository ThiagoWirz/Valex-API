export function calculateBalance(recharges:any[], transactions:any[]){

  let sumOfRecharges = 0
  let sumOfTransactions = 0
  recharges.forEach(recharge => sumOfRecharges += recharge.amount)
  transactions.forEach(transaction => sumOfTransactions += transaction.amount)
  
  return sumOfRecharges - sumOfTransactions
}
