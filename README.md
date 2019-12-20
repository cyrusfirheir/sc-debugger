
# scDebugger

A debug tool for SugarCube v2, to be used primarily with Twee Compilers.

Displays a list of all story variables, and allows editing their current values.

![scd-screencap-01](https://imgur.com/bDx7MEg.png)
![scd-screencap-02](https://imgur.com/XT7KNAa.png)
![scd-screencap-03](https://imgur.com/QBzuViU.png)

---

## Installation

First `Clone` or [`Download`](https://github.com/cyrusfirheir/sc-debugger/archive/master.zip) this repository. The *.zip* file contains both the minified-drop-to-use and pretty-you-wanna-know-what-it-does versions of the code. Pick your choice and go to town with it.

#### *If using the Twine app*

From inside the *`dist-scd`* directory, copy contents of `scDebuggerScript.min.js` into your ***Story Javascript*** section, `scDebuggerStyle.min.css` into your ***Story Stylesheet*** section.

Then finally, copy contents of `scDebuggerMarkup.tw` into a passage named ***sc-debugger*** and add ***nobr*** as a tag. Delete this line from the top:

```html
:: sc-debugger [nobr]
```

#### *If using a Twee compiler*

Drop the *`dist-scd`* directory containing `scDebuggerScript.min.js`, `scDebuggerStyle.min.css` and `scDebuggerMarkup.tw` into your source directory.

---

## Usage

Press <kbd>=</kbd> on your keyboard to open the debugger!

---

## Planned additions

- Grouping / Multiple Tabs
- Locked values
- A Chrome extension

---

## ***! Note***

scDebugger uses `Lodash.js`. If you (somehow) already use it in your project, download only the components from the `src` directory (exclude Lodash from your project source).

---

## Changelog

- v0.1.2
  - Fixed issue regarding dot notation being used for invalid object property identifiers.
  - Changed `<div>` ID naming to a number based system instead of slugified variable names to avoid ambiguity while setting variable values.

- v0.1.1
  - Styling changes. The UI now looks more consistent across projects.
  - Tweaks of how the variable names are displayed. Now they're more akin to how you'd define and access Story variables in SugarCube v2.

- v0.1.0
  - Initial release.
