function countPoints(scores) {
    return scores.reduce((sum, score) => {
        let scoreItem = score.split(':');
        return sum + (scoreItem[0] > scoreItem[1] ? 3 : scoreItem[0] === scoreItem[1])
    }, 0)
}

console.log(countPoints(['3:1','1:0','0:0','1:2','4:0','2:3','1:1','0:1','2:1','1:0']));
console.log(countPoints(['1:1','1:2','2:0','4:2','0:1','2:3','1:1','0:1','1:1','3:0']));