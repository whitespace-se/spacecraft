# Spacecraft

## Table of contents

- [Setup](#setup)
- [Tools](#tools)

## Setup

### Install yarn globally
Yarn installation instruction](https://yarnpkg.com/en/docs/install)

### Install dependencies
```
yarn
```

### Start spacecraft
```
gulp
```

## Tools

### EditorConfig

EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. Download the plugin at [http://editorconfig.org/](http://editorconfig.org/).

### Stylelint

* Use one discrete selector per line in multi-selector rulesets.
* Include a single space before the opening brace of a ruleset.
* Include one declaration per line in a declaration block.
* Use one level of indentation for each declaration.
* Include a single space after the colon of a declaration.
* Use lowercase and shorthand hex values, e.g., #aaa.
* Use single or double quotes consistently. Preference is for double quotes, e.g., content: "".
* Quote attribute values in selectors, e.g., input[type="checkbox"].
* Where allowed, avoid specifying units for zero-values, e.g., margin: 0.
* Include a space after each comma in comma-separated property or function values.
* Include a semi-colon at the end of the last declaration in a declaration block.
* Place the closing brace of a ruleset in the same column as the first character of the ruleset.
* Separate each ruleset by a blank line.

#### Editor plugins

- [linter-stylelint](https://github.com/AtomLinter/linter-stylelint) - an Atom Linter plugin for Stylelint.
- [SublimeLinter-contrib-stylelint](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint) - a Sublime Text plugin for Stylelint.
- [vscode-stylelint](https://github.com/shinnn/vscode-stylelint) - a Visual Studio Code extension for Stylelint.

`stylelint-config.json` is our default [Stylelint](http://stylelint.io/) config. If the project setup needs to modify these settings you can override rules in the `.stylelintrc` config.

For example, changing indentation to four spaces and turning off the number-leading-zero rule:

```
{
  "extends": "./stylelint-config.json",
  "rules": {
    "indentation": 4,
    "number-leading-zero": null,
  }
}
```

Read more about [extending rules](http://stylelint.io/user-guide/configuration/#extends).

#### Temporary turning off rules

Rules can be temporarily turned off by using special comments in your CSS. See [Configuration rules](http://stylelint.io/user-guide/configuration/#turning-rules-on-and-off) for a list of commands.

### CSScomb

CSScomb is a coding style formatter for CSS. The main feature is sorting properties in a specific order. Learn more at
[http://csscomb.com/](http://csscomb.com/).