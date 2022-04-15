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