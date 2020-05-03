function convert(...args) {
    for (let i in args) {
        if (typeof args[i] === 'string') {
            args[i] = Number(args[i])
        } else {
            args[i] = String(args[i])
        }
    }
    return args;
}

// console.log(convert('1', 2, 3, '4')) // [1, '2', '3', 4]


function executeforEach(arr, calback) {
    for (let i of arr) {
        calback(i)
    }
}

// executeforEach([1, 2, 3], function (el) {
//     console.log(el * 2)
// }) // 2 4 6

function mapArray(arr, calback) {
    let result = []

    executeforEach(arr, function (el) {
        result.push(calback(Number(el)));
    })

    return result
}


// console.log(mapArray([2, '5', 8], function (el) {
//     return el + 3
// })) // returns [5, 8, 11]

function filterArray(arr, calback) {
    let result = []

    executeforEach(arr, function (el) {
        calback(el) && result.push(el)
    })

    return result
}

// console.log(filterArray([2, 5, 8], function (el) {
//     return el % 2 === 0
// }))
// // returns [2, 8]

function containsValue(arr, target) {
    let result = false;

    executeforEach(arr, function (el) {
        if (el === target) {
            result = true;
        }
    })
    return result
}

//   console.log(containsValue([3, 2, 5,], 2))  // returns true
//   console.log(containsValue([12, 4, 6], 5))  // returns false

function flipOver(string) {
    let result = ''

    for (let i = 0; i < string.length; i += 1) {
        result += string[string.length - 1 - i]
    }

    return result
}

//   console.log(flipOver('hey world')) // 'dlrow yeh'

function makeListFromRange(arr) {
    const startRange = arr[0];
    const endRange = arr[1];
    const result = []

    for (let i = startRange; i <= endRange; i += 1) {
        result.push(i);
    }

    return result;

}

// console.log(makeListFromRange([2, 7])) // [2, 3, 4, 5, 6, 7]

const fruits = [{
        name: 'apple',
        weight: 0.5
    },
    {
        name: 'pineapple',
        weight: 2
    }
]

function getArrayOfKeys(obj, keyName) {
    const result = [];
    executeforEach(obj, function (el) {
        result.push(el[keyName]);
    })

    return result;
}

// console.log(getArrayOfKeys(fruits, 'name'))
// // returns [‘apple’, ‘pineapple’]

function substitute(arr) {
    const MIN = 10;
    const MAX = 20;

    return mapArray(arr, function (el) {
        return el > MIN && el < MAX ? '*' : el;
    })
}

// console.log(substitute([58, 14, 48, 12, 31, 19, 10]));
// // returns [58, '*', 48, '*', 31, '*', 10]

function getPastDay(date, daysAgo) {
    const copyDate = new Date(date)

    const pastDate = new Date(
        copyDate.setDate(copyDate.getDate() - daysAgo)
    ).getDate()

    return pastDate
}

// console.log(getPastDay(date, 1)) // 1, (1 Jan 2020)
// console.log(getPastDay(date, 2)) // 31, (31 Dec 2019)
// console.log(getPastDay(date, 365)) // 2, (2 Jan 2019)

function formatDate(date) {
    const formattedDate = new Date(date)

    const parseDate = {
        year: formattedDate.getFullYear(),
        day: (formattedDate.getDate() < 10 ? '0' : '') + formattedDate.getDate(),
        month: (formattedDate.getMonth() + 1 < 10 ? '0' : '') +
            (formattedDate.getMonth() + 1),
        hour: (formattedDate.getHours() < 10 ? '0' : '') + formattedDate.getHours(),
        minutes: (formattedDate.getMinutes() < 10 ? '0' : '') + formattedDate.getMinutes()
    }

    const newDate = `${parseDate.year}/${parseDate.month}/${parseDate.day} ${parseDate.hour}:${parseDate.minutes}`

    return newDate
}

// console.log(formatDate(new Date('6/15/2019 09:15:00'))) // "2019/06/15 09:15"
// console.log(formatDate(new Date())) // "2020/04/07 12:56" // gets current local time