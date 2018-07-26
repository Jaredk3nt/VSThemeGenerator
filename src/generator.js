const vscode = require('vscode');
const fs = require('fs');

const scopes = require('../data/scopes.json');
const pkg = require('../data/generatedThemePackage.json');


const writeThemetoFile = (theme) => {
    fs.writeFile(`${process.env['HOME']}/.vscode/extensions/generatedTheme/themes/generated-color-theme.json` , JSON.stringify(theme, null, 4), (err) => {
        if(err) {
            vscode.window.showErrorMessage('Failed to write theme file.');
            return console.log(err.message);
        }
        console.log(`Custom Theme Generated!`);
    }); 
}

const generateColorTheme = (colors) => {
    let theme = {
        name: "GeneratedTheme",
        colors: {},
        tokenColors: []
    }

    // Grab primary and foreground for defaults
    const foreground = colors.hasOwnProperty('foreground') ? colors.foreground : "#ffffff";
    const primary = colors.hasOwnProperty('primary') ? colors.primary : foreground;
    const background = colors.hasOwnProperty('background') ? colors.background : "#212121";
    const backgroundSecondary = colors.hasOwnProperty('backgroundSecondary') ? colors.backgroundSecondary : background;

    // Setup editor 'colors'
    theme.colors = {
        "editor.foreground": foreground,
        "editor.background": background,
        "titleBar.activeBackground": background,
        "sideBar.background": backgroundSecondary,
        "sideBarSectionHeader.background": backgroundSecondary,
        "sideBarTitle.foreground": primary,
        "activityBar.background": background,
        "activityBar.foreground": foreground,
        "activityBarBadge.background": primary,
        "statusBar.background": primary,
        "statusBar.noFolderBackground": primary,
        "editorGroupHeader.tabsBackground": backgroundSecondary,
        "tab.activeBorder": primary,
        "tab.inactiveBackground": backgroundSecondary
    }

    // Iterate through the keys avaliable in the scopes and generate
    // theme tokenColors
    Object.keys(scopes).forEach(scope => {
        let scopeObj = {
            name: scope,
            scope: scopes[scope],
            settings: {
                foreground: colors.hasOwnProperty(scope) ? colors[scope] : foreground
            }
        }
        theme.tokenColors.push(scopeObj);
    });

    return theme;
}

const directorySetup = () => {
    if (!fs.existsSync(`${process.env['HOME']}/.vscode/extensions/generatedTheme/themes`)) {
        console.log('not exists' + `${process.env['HOME']}/.vscode/extensions/generatedTheme/themes`);
        fs.mkdir(`${process.env['HOME']}/.vscode/extensions/generatedTheme`, (err) => {
            if (err) {
                vscode.window.showErrorMessage(`Failed to properly create necessary file structure. VSThemeGenerator Requires ${process.env['HOME']}/.vscode/extensions/generatedTheme/themes to exist.`)
                return console.log(err.message);
            }
            fs.writeFile(`${process.env['HOME']}/.vscode/extensions/generatedTheme/package.json`, JSON.stringify(pkg, null, 4), (err) => {
                if (err) {
                    vscode.window.showErrorMessage(`Failed to properly create necessary file structure. VSThemeGenerator Requires ${process.env['HOME']}/.vscode/extensions/generatedTheme/themes to exist.`)
                    return console.log(err.message);
                }
            });
            fs.mkdir(`${process.env['HOME']}/.vscode/extensions/generatedTheme/themes`, (err) => {
                if (err) {
                    vscode.window.showErrorMessage(`Failed to properly create necessary file structure. VSThemeGenerator Requires ${process.env['HOME']}/.vscode/extensions/generatedTheme/themes to exist.`)
                    return console.log(err.message);
                }
            });
        });
    }
}

module.exports = {
    generateColorTheme,
    writeThemetoFile,
    directorySetup
}


