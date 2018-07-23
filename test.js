const { generateColorTheme } = require('./generator');
const colors = require('./colors.json');

console.log(JSON.stringify(generateColorTheme(colors), null, 4));