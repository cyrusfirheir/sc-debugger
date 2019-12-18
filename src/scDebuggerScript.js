
(function() {
  /*
  * sc-debugger, by Cyrus Firheir; for SugarCube v2
  * v0.1.0
  * requires scDebuggerStyle.css / scDebuggerStyle.min.css and scDebuggerMarkup.tw
  */

  //sc-debugger defined
  let scDebugger = {};

  //load variables for display
  scDebugger.load = function() {
    return setup.npmFlat.flatten(SugarCube.State.variables, {delimiter: `-`});
  }

  scDebugger.parseDelimiter = function(varName) {
    return varName.replace(/\-/g, ".");
  }

  //return an input type for variable editing
  scDebugger.input = function(v) {
    let defaultVal = _.get(SugarCube.State.variables, scDebugger.parseDelimiter(v));
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
    let v = $(this).parent(".variable").attr("id");
    let path = scDebugger.parseDelimiter(v);
    let inputType = typeof _.get(SugarCube.State.variables, path);
    let v_val;
    if (inputType === "boolean") {
      v_val = $(`#sc-debugger-window .variables-display #${v} .switch`).hasClass("true");
    } else if (inputType === "number") {
      v_val = Number($(`#sc-debugger-window .variables-display #${v} input`).val());
    } else {
      v_val = $(`#sc-debugger-window .variables-display #${v} input`).val();
    }
    _.set(SugarCube.State.variables, path, v_val);
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
