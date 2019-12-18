
# scDebugger
A debug tool for SugarCube v2, to be used primarily with Twee Compilers.

---

## Installation

First `Clone` or [`Download`](https://github.com/cyrusfirheir/sc-debugger/archive/master.zip) this repository. The *.zip* file contains both the minified-drop-to-use and pretty-you-wanna-know-what-it-does versions of the code. Pick your choice and go to town with it. 

#### *If using the Twine app*

From inside the *`scd`* directory, copy contents of `scDebuggerScript.min.js` into your ***Story Javascript*** section, `scDebuggerStyle.min.css` into ypur ***Story Stylesheet*** section.

Then finally, copy contents of `scDebuggerMarkup.tw` into a passage named ***sc-debugger*** and add ***nobr*** as a tag. Delete this line from the top:

```html
:: sc-debugger [nobr]
```

#### *If using a Twee compiler*

Drop the *`scd`* directory containing `scDebuggerScript.min.js`, `scDebuggerStyle.min.css` and `scDebuggerMarkup.tw` into your source directory.

---

## Usage

Press '=' on your keyboard to open the debugger!

---

## Planned additions

`Grouping / Multiple Tabs` `Locked values` `A Chrome extension`

---

## ***! Note***

scDebugger uses `Lodash.js`. If you (somehow) already use it in your project, download only the components from the `src` directory (exclude Lodash from your project source).
