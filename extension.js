const vscode = require('vscode');
const { generateColorTheme, writeThemetoFile, directorySetup } = require('./src/generator');
const defaultColors = require('./data/colors.json');

const getRandomColors = () => {
    let colors = {};
    Object.keys(defaultColors).forEach(key => {
        if (key === 'background') {
            colors[key] = `#${Math.floor(Math.random()*5592405).toString(16)}`;
        } else {
            colors[key] = `#${Math.floor(Math.random()* (16777215 - 6710886) + 6710886).toString(16)}`;
        }
    });
    return colors;
}

const getColors = () => {
    let config = vscode.workspace.getConfiguration('themeGenerator');
    // If they have colors defined merge with default colors to fill gaps
    if (config) {
        let colors = Object.assign({}, config);
        let errorList = [];
        Object.keys(defaultColors).forEach(key => {
            if (colors.hasOwnProperty(key)) {
                // Validate their input colors
                const colorRe = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})/;
                if (!colorRe.test(colors[key])) {
                    colors[key] = defaultColors[key];
                    errorList.push({ scope: key, color: colors[key] });
                }
            } else {
                colors[key] = defaultColors[key];
            }
        });

        // Notify user if their colors are invalid
        if (errorList.length) {
            vscode.window.showErrorMessage(`Some of your input colors are in an invalid format so the default color has been used instead. Colors must be #RGB, #RGBA, #RRGGBB, #RRGGBBAA. Invalid colors: ${errorList.map(e => ` ${e.scope}: ${e.color}`)}`);
        }

        return colors;
    }
    return defaultColors;
}

const generateThemeCmd = () => {
    const colors = getColors();
    const theme = generateColorTheme(colors);
    writeThemetoFile(theme);
    vscode.window.showInformationMessage('Custom Theme Generated, use by reloading the VS Code window and then selecting GeneratedTheme from the theme menu.');
}

const randomThemeCmd = () => {
    const colors = getRandomColors();
    const theme = generateColorTheme(colors);
    writeThemetoFile(theme);
    vscode.window.showInformationMessage('Random Theme Generated, use by reloading the VS Code window and then selecting GeneratedTheme from the theme menu.');
}

exports.activate = (context) => {
    directorySetup();
	let sub = context.subscriptions;
    sub.push(vscode.commands.registerCommand('extension.generateTheme', generateThemeCmd));
    sub.push(vscode.commands.registerCommand('extension.randomTheme', randomThemeCmd));
};

exports.deactivate = () => { };