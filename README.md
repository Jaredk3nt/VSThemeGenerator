# VS Theme Generator

VS Theme Generator allows you to create your perfect VS Code theme without the hassle of having to create your own extension.

## Usage

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
    "variables": "#fff"
}
```

Once you have added your colors you can check out your theme by opening your command palette `CMD/CTRL + SHIFT + P` and running `Generate Theme` This will create the theme files required for your generated theme. You can then select the theme by going to `Preferences: Color Theme` in the command palette and selecting `GeneratedTheme`. You will need to also hit `Reload Window` in the command palette before your changes are avaliable.

## Roadmap

Features that I plan to implement include:
- Theme Randomizer
- Proper validation on input colors
- Better language support

**Let me know if there is any feature you want, or bug you need fixed: [Github Repo](https://github.com/Jaredk3nt/VSThemeGenerator)**
