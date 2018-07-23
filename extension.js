const vscode = require('vscode');
const { generateColorTheme, writeThemetoFile } = require('./src/generator');
const defaultColors = require('./data/colors.json');
const pkg = require('./data/generatedThemePackage.json');
var fs = require('fs');

const directorySetup = () => {
    fs.mkdir(`${process.env['HOME']}/.vscode/extensions/generatedTheme`, (err) => {
        if (err) return console.log('Failed to create dir generatedTheme/');
        fs.writeFile(`${process.env['HOME']}/.vscode/extensions/generatedTheme/package.json`, JSON.stringify(pkg, null, 4), (err) => {
            if (err) return console.log('Failed to create package.json in dir generatedTheme/');
        });
        fs.mkdir(`${process.env['HOME']}/.vscode/extensions/generatedTheme/themes`, (err) => {
            if (err) return console.log('Failed to create dir generatedTheme/themes');
        });
    });
}

const getColors = () => {
    let config = vscode.workspace.getConfiguration('themeGenerator');
    // If they have colors defined merge with default colors to fill gaps
    if (config.colors) {
        let colors = Object.assign({}, config.colors);

        Object.keys(defaultColors).forEach(key => {
            if (colors.hasOwnProperty(key)) {
                // validate color fix this to allow for more color types
                if (colors[key].length !== 7 || colors[key][0] !== "#") {
                    colors[key] = defaultColors[key];
                }
            } else {
                colors[key] = defaultColors[key];
            }
        });

        return colors;
    }
    return defaultColors;
}

const generateThemeCmd = () => {
    const colors = getColors();
    console.log(colors);
    const theme = generateColorTheme(colors);
    writeThemetoFile(theme);
    vscode.window.showInformationMessage('Custom Theme Generated!\nUse by selecting GeneratedTheme from the theme menu and then reloading the window.');
}

exports.activate = (context) => {
    directorySetup();
	let sub = context.subscriptions;
	sub.push(vscode.commands.registerCommand('extension.generateTheme', generateThemeCmd));
	//sub.push(vscode.workspace.onDidChangeConfiguration(formatters.configure.bind(formatters)));
};

exports.deactivate = () => { };