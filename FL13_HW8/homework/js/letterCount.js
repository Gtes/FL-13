function letterCount(string, letter) {
    return string.toLowerCase().split(`${letter}`).length - 1;
}

console.log(letterCount("Maggy", "g"));
console.log(letterCount("Barry", "b"));
console.log(letterCount("", "z"));