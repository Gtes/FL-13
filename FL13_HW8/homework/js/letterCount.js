function letterCount(string, substring) {
    return substring ? string.toLowerCase().split(substring).length-1 : 0;
}

console.log(letterCount("Maggy","g"));
console.log(letterCount("Barry","b"));
console.log(letterCount("","z"));