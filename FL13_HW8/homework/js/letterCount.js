function letterCount(string, letter) {
    return string.toLowerCase().split(``).filter((value) => value === letter).length;
}

console.log(letterCount("Maggy", "g"));
console.log(letterCount("Barry", "b"));
console.log(letterCount("", "z"));