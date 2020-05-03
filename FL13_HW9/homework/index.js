function convert(...args) {
    for (let i in args) {
        if (typeof args[i] === 'string') {
            args[i] = Number(args[i]);
        } else {
            args[i] = String(args[i]);
        }
    }
    return args;
}

function executeforEach(arr, calback) {
    for (let i of arr) {
        calback(i);
    }
}

function mapArray(arr, calback) {
    let result = [];

    executeforEach(arr, function (el) {
        result.push(calback(parseInt(el)));
    })

    return result;
}

function filterArray(arr, calback) {
    const result = [];

    executeforEach(arr, function (el) {
        calback(el) && result.push(el);
    })

    return result;
}

function containsValue(arr, target) {
    let result = false;

    executeforEach(arr, function (el) {
        if (el === target) {
            result = true;
        }
    })

    return result;
}

function flipOver(string) {
    let result = '';

    for (let i = 0; i < string.length; i += 1) {
        result += string[string.length - 1 - i];
    }

    return result;
}

function makeListFromRange(arr) {
    const startRange = arr[0];
    const endRange = arr[1];
    const result = [];

    for (let i = startRange; i <= endRange; i += 1) {
        result.push(i);
    }

    return result;
}

function getArrayOfKeys(obj, keyName) {
    const result = [];

    executeforEach(obj, function (el) {
        result.push(el[keyName]);
    })

    return result;
}

function substitute(arr) {
    const MIN = 10;
    const MAX = 20;

    return mapArray(arr, function (el) {
        return el > MIN && el < MAX ? '*' : el;
    })
}

function getPastDay(date, daysAgo) {
    const copyDate = new Date(date);

    const pastDate = new Date(
        copyDate.setDate(copyDate.getDate() - daysAgo)).getDate();

    return pastDate;
}

function formatDate(date) {
    const initialDate = new Date(date);

    const parseDate = {
        year: initialDate.getFullYear(),
        day: (initialDate.getDate() < 10 ? '0' : '') + initialDate.getDate(),
        month: (initialDate.getMonth() + 1 < 10 ? '0' : '') +
            (initialDate.getMonth() + 1),
        hour: (initialDate.getHours() < 10 ? '0' : '') + initialDate.getHours(),
        minutes: (initialDate.getMinutes() < 10 ? '0' : '') + initialDate.getMinutes()
    };

    const formattedDate = `${parseDate.year}/${parseDate.month}/${parseDate.day} ${parseDate.hour}:${parseDate.minutes}`;

    return formattedDate;
}