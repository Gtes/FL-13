function assign(targetObj, ...args) {
    for (let obj of args) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                targetObj[key] = obj[key]
            }
        }
    }

    return targetObj;
}


//just in case
// const paymentsCard = {
//     cash: '300$'
// }

// const creditCard = {
//     creditLimit: '50$',
//     cash: '700$'
// };

// const testCard = {
//     creditLimit: '50$',
//     test: true,
//     cash: '200$'
// };

// const universalCard = assign(paymentsCard, creditCard, testCard)

// console.log(`my assing`)
// console.log(universalCard)


// const test = Object.assign(paymentsCard, creditCard, testCard)

// console.log(`Object.assign`)
// console.log(test)