'use strict'

function isEmptyOrWhitespcesOrNull(str) {
    if (str === null || str === '' || !str.trim()) {
        return true
    } else {
        return false
    }
}

function isUserExist(username) {
    if (Object.keys(users).includes(username)) {
        return true
    } else {
        return false;
    }
}

function checkUserByUsername(username) {
    const MIN_USERNAME_LENGTH = 3;

    switch (true) {
        case isEmptyOrWhitespcesOrNull(username):
            alert(`Canceled`)
            return false;

        case username.length <= MIN_USERNAME_LENGTH:
            alert(`I don't know any users having name length less than 4 symbols`);
            return false;

        case isUserExist(username):
            return true;

        default:
            alert(`I don’t know you`)
            return false;
    }
}

function verifyUser(username) {
    if (checkUserByUsername(username)) {
        const password = prompt('Password');

        if (isEmptyOrWhitespcesOrNull(password)) {
            return console.log(`Canceled`);
        } else if (users[`${username}`] === password) {
            checkTimeGreetings(username)
        } else {
            alert('Wrong Password!')
        }
    }
}

function checkTimeGreetings(username) {
    const currentTime = new Date().getHours()

    const DAY_TIME_START = 8;
    const DAY_TIME_END = 20;
    
    const EVENING_TIME_START = 20;
    const EVENING_TIME_END = 8;

    switch (true) {
        case currentTime >= DAY_TIME_START && currentTime < DAY_TIME_END:
            alert(`Good day, dear ${username}!`)
            break;

        case currentTime >= EVENING_TIME_START || currentTime < EVENING_TIME_END:
            alert(`Good evening, dear  ${username}!`)
            break;

        default:
            alert(`Hello, dear  ${username}!`)
            break;
    }
}

const users = {
    Admin: 'RootPass',
    User: 'UserPass'
}

let getuser = prompt('Username:');

verifyUser(getuser);