
const fs = require('fs');
const content = fs.readFileSync('src/components/Homepage.jsx', 'utf8');

let divCount = 0;
let lines = content.split('\n');

lines.forEach((line, index) => {
    let opens = (line.match(/<div/g) || []).length;
    let closes = (line.match(/<\/div>/g) || []).length;
    divCount += opens;
    divCount -= closes;
    if (divCount < 0) {
        console.log(`Negative div count at line ${index + 1}: ${divCount}`);
    }
});

console.log(`Final div count: ${divCount}`);

let sectionCount = 0;
lines.forEach((line, index) => {
    let opens = (line.match(/<section/g) || []).length;
    let closes = (line.match(/<\/section>/g) || []).length;
    sectionCount += opens;
    sectionCount -= closes;
});
console.log(`Final section count: ${sectionCount}`);
