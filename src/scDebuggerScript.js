
;(function() {
  /*
  * sc-debugger, by Cyrus Firheir; for SugarCube v2
  * v0.1.2
  * requires ((flat.js, lodash.min.js) only if using unminified version) scDebuggerStyle.css / scDebuggerStyle.min.css, and scDebuggerMarkup.tw
  */

  //sc-debugger defined
  let scDebugger = {};

  scDebugger.version = "0.1.2";

  //load variables for display
  scDebugger.load = function() {
    let load = setup.npmFlat.flatten(State.variables,
      {
          delimiter: `.__.`
        , transformKey: function(key){
          return key.replace(/\"/g, `\\\"`);
        }
      });
    let loadKeys = Object.keys(load);
    let ret = [];
    for (let l = 0; l < loadKeys.length; l++) {
      let varPath = loadKeys[l].split(/\.__\./).map(function(s, i){
        return (s.replace(/[a-zA-Z\$\_][a-zA-Z0-9\$\_]+/g, "").length === 0)
                ? (i === 0) ? (`${s}`) : (`.${s}`)
                : (s.replace(/\d+/g, "").length === 0)
                   ? (`[${s}]`)
                   : (`["${s}"]`);
      }).join("");
      ret = [...ret, varPath];
    }
    return ret;
  }

  //return an input type for variable editing
  scDebugger.input = function(v) {
    let defaultVal = _.get(State.variables, v);
    switch (typeof defaultVal) {
      case ("number"):
        return `<input type="number" value="${defaultVal}">`;
        break;
      case ("boolean"):
        return `<span class="switch ${(defaultVal) ? "true" : ""}"></span>`;
        break;
      case ("string"):
      default:
        return `<input type="text" value="${defaultVal}">`;
        break;
    }
  }

  //switch input type
  $(document).on('click', '#sc-debugger-window .variables-display .variable .switch', function() {
    $(this).toggleClass("true");
  });

  //set variable after editing
  $(document).on('click', '#sc-debugger-window .variables-display .variable a', function() {
    let path = $(this).siblings(".name").text().substring(1);
    let cssID = $(this).parent(".variable").attr("id");
    let inputType = typeof _.get(State.variables, path);
    let v_val;
    if (inputType === "boolean") {
      v_val = $(`#sc-debugger-window .variables-display #${cssID} .switch`).hasClass("true");
    } else if (inputType === "number") {
      v_val = Number($(`#sc-debugger-window .variables-display #${cssID} input`).val());
    } else {
      v_val = $(`#sc-debugger-window .variables-display #${cssID} input`).val();
    }
    _.set(State.variables, path, v_val);
  });

  //launch debugger
  scDebugger.launch = function() {
    if ($("#story").html().includes(`<div id="sc-debugger-window">`)) { return; }
    else { $.wiki(`<<nobr>><<append "#story">><<include "sc-debugger">><</append>><</nobr>>`); }
  }
  //kill debugger
  scDebugger.kill = function() {
    $("#sc-debugger-window").remove();
  }
  //relaunch debugger
  scDebugger.relaunch = function() {
    scDebugger.kill();
    scDebugger.launch();
  }

  setup.scDebugger = Object.freeze(scDebugger);

}());

//event listener for shortcut key
$(document).on('keydown', function(ev) {
  switch (ev.code) {
    case "Equal":
      setup.scDebugger.launch();
      break;
  }
});
