/**
 * This function calculates total price of a new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {number} Total price
 */
export const totalPrice = (products)=>{
    let summary = 0
    products.forEach(product => summary += product.price)
    return summary
}