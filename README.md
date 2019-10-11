# VS Theme Generator

VS Theme Generator allows you to create your perfect VS Code theme without the hassle of having to create your own extension.

<a href="https://www.patreon.com/danggoodcode"><img src="https://img.shields.io/badge/Patreon-Support%20my%20work-orange?style=for-the-badge&logo=patreon"/></a>

## Usage

### Generate Custom Theme

Once you have downloaded and installed VSThemeGenerator you will be able to modify your theme by adding the configuration variable `themeGenerator.colors`.

``` json
"themeGenerator.colors": {
    "background": "#21282d",
    "foreground": "#fff",
    "primary": "#327193",
    "keywords": "#43baba",
    "functions": "#3fa5c1",
    "strings": "#b9ecfa",
    "numbers": "#8789c0",
    "punctuation": "#494f53",
    "operators": "#327193",
    "comment": "#3d4b54",
    "tags": "#43baba",
    "attributes": "#3fa5c1",
    "properties": "#43baba",
    "builtins": "#b5ca8d",
    "variables": "#fff",
    "types": "#3fa5c1"
}
```

Once you have added your colors you can check out your theme by opening your command palette `CMD/CTRL + SHIFT + P` and running `Generate Theme` This will create the theme files required for your generated theme. Reload the VS Code window through the command palette: `Reload Window`. You can then select the theme by going to `Preferences: Color Theme` in the command palette and selecting `GeneratedTheme`.

### Random Theme

Through the command palette `CMD/CTRL + SHIFT + P` run `Random Theme`. This will generate a psuedo random color theme (attempts to create some readability by limiting the ranges on certain values). Reload the VS Code window through the command palette: `Reload Window`. You can then select the theme by going to `Preferences: Color Theme` in the command palette and selecting `GeneratedTheme`.

## Roadmap

Features that I plan to implement include:
- Continuous improvement to language support
- Increased customizability on scopes

**Let me know if there is any feature you want, or bug you need fixed: [Github Repo](https://github.com/Jaredk3nt/VSThemeGenerator)**
