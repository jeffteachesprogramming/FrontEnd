"use strict";
//  Declare state with the CalcState type
const state = {
    current: "0",
    previous: null,
    operator: null,
    waitForNext: false,
    history: [],
};
//  Create the DOM references
const resultElement = document.getElementById("result");
const expressionElement = document.getElementById("expression");
const historyListElement = document.getElementById("historyList");
const clearHistoryElement = document.getElementById("clearHistory");
//  Helper Functions
//  The logic in these functions is identical to their JavaScript equivalents
//  Only the added type annotations are new
//  Synchronize the two visible display lines with the current calculator state.
//  This should be called after every state mutation so the UI is never stale.
function render() {
    resultElement.textContent = state.current;
    if (state.previous !== null && state.operator) {
        expressionElement.textContent = `${state.previous} ${state.operator}`;
    }
    else {
        expressionElement.textContent = "";
    }
}
//  Append one completed calculation string to both the in memory
//  histroy arran and the visble history unordered list <ul> in
//  the DOM. Each rendered list item is clickable. Clicking an
//  item restores that result as the new working value.
function addHistoryEntry(entry) {
    state.history.push(entry);
    const li = document.createElement("li");
    //  Clic a history item to restore its result value
    li.addEventListener("click", () => {
        const parts = entry.split("=");
        const val = parts[parts.length - 1]?.trim();
        //  Seed the calculator with the recalled value and then
        //  clear any pending operation so the user starts fresh
        resetState(val);
        render();
    });
    li.textContent = entry;
    historyListElement.appendChild(li);
    //  Auto scross to the newest entry so that the latest
    //  result is always visible
    if (historyListElement.parentElement) {
        historyListElement.parentElement.scrollTop =
            historyListElement.parentElement.scrollHeight;
    }
}
//  This will visually indicate which operator button is
//  currently active
function highlightOperator(op) {
    //  btn.dataset.action will hold the operation name
    //  (e.g. "add"). We will toggle the active class only
    //  on the button whose data-action attribute matches
    //  the requested operator. Remove it from all others.
    document.querySelectorAll(".btnOperation").forEach((btn) => {
        const button = btn;
        button.classList.toggle("active", button.dataset.action === op);
    });
}
//  This function will return the calculator to a clean, initial state
//  and optionally preload a seed value into the display. It is used
//  by the AC (all clear) button and by the history recall
function resetState(seedValue) {
    //  If there is no seed, show "0" as the default display value
    state.current = seedValue !== undefined ? String(seedValue) : "0";
    state.previous = null; //  No left hand operator
    state.operator = null; //  No operator
    state.waitForNext = false; //  Next keypress will extend current not replace it
    highlightOperator(null); //  Remove any operator button highlight
}
//  This function will append a single numeric digit to the current display value
//  or begin a new number when the calculator is waiting for the right hand
//  operator after an operator has been pressed
function inputIsDigit(digit) {
    if (state.waitForNext) {
        //  An operator was pressed so the incoming digit will start
        //  a new right hand number
        state.current = digit;
        state.waitForNext = false;
    }
    else {
        //  Replace the deault "0" to avoid a leading 0
        state.current = state.current === "0" ? digit : state.current + digit;
    }
}
//  This function will insert a decimal point into the current number,
//  and ensure that there is at most one decimal point in any number.
//  If the calcuator is waiting for a right hand operand, begin that
//  operand as "0" so the display will always show a leading zero
//  before the decimal point (i.e., 0.25 vs. .25)
function inputDecimal() {
    if (state.waitForNext) {
        //  Start the new right hand operand with a leading 0
        state.current = "0";
        state.waitForNext = false;
        return;
    }
    //  Only want to insert a decimal point if the current
    //  number does not already contain one
    if (!state.current.includes(".")) {
        state.current += ".";
    }
}
//  This function handles an operator button press (+, -, *, or /).
//  If a previous operand and operator are already pending, evaluate
//  the pending subexpression first so that the result can become
//  the new hand operand. Then store the new operator and flag that
//  the next digt press should begin the right hand operand
function inputOperator(op) {
    //  Parse the currently display valud as the right hand side
    //  of any already pending subexpression
    const value = parseFloat(state.current);
    //  If a left hand operand and operator are already stored
    //  and the user has type one or more digits since (i.e.,
    //  waitForNext is false), evaluate the pending expression
    //  before applying the new operator.
    //
    //  The !state.waitForNext guard applied prevents the
    //  evaluation of back-to-back operators (e.g. **)
    if (state.previous !== null && !state.waitForNext) {
        const result = calculate(parseFloat(state.previous), value, state.operator);
        state.current = formatResult(result);
    }
    //  Replace the display with the intermediate result so that the user
    //  sees the running total
    state.previous = state.current; //  Save current display as new left hand operator
    state.operator = op; //  Record which operator was pressed
    state.waitForNext = true; //  Next digit pressed starts right hand operator
    highlightOperator(op); //  Light up the pressed operator
    render(); //  Refresh expression line immediately
}
//  This function will finalize the pending expression when the user presses
//  the "=" button. First, it returns if there is nothing to evaluate.
//  If there is something to evaluate, it computes the result from the stored
//  left hand operand, the operator, and the current right hand operand. It
//  then logs the full expression to the history. Last, it displays the result
//  and resets the pending state
function evaluate() {
    if (state.previous === null || state.operator === null) {
        return;
    }
    const left = parseFloat(state.previous);
    const right = parseFloat(state.current);
    const result = calculate(left, right, state.operator);
    //  Build a human readably log entry before mutating the
    //  state so we can capture the original operands and
    //  operator
    const entry = `${state.previous} ${state.operator} ${state.current} = ${formatResult(result)}`;
    addHistoryEntry(entry);
    //  Show final result in the main display
    state.current = formatResult(result);
    state.previous = null; //  Clear left hand operand
    state.operator = null; //  Clear pending operator
    state.waitForNext = true; //  Next digit press starts a new number
    highlightOperator(null); //  Remove operator button highlight
}
//  This function applied the requested operation to the two
//  numbers and results the numeric result. Note that division
//  by zero return NaN (not a number) so the caller can handle
//  the error display
function calculate(a, b, op) {
    switch (op) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            if (b === 0) {
                return NaN;
            }
            return a / b;
        default:
            return b;
    }
}
//  This function convers a raw JavaScript number into a 
//  clean display string. It also handles error sentinels
//  (NaN, +Infinity, and -Infinity) and trims the
//  floating point precision at 12 significant digits
function formatResult(res) {
    if (isNaN(res)) {
        return "Error";
    }
    if (!isFinite(res)) {
        return "Error";
    }
    return String(parseFloat(res.toPrecision(12)));
}
//  This function converts the currently display number to its
//  percentage equivalent by dividing it by 100
function handlePercent() {
    state.current = formatResult(parseFloat(state.current) / 100);
    //  Clear the flag so the value can be extended with
    //  additional digits if the user keeps typing
    state.waitForNext = false;
}
//  Toggle the arithmetic sign of the currently displayed number
//  i.e. positive to negative or negative to positive
function handleSign() {
    const n = parseFloat(state.current);
    //  Only toggle non-zero numbers
    if (n != 0) {
        state.current = formatResult(-n);
    }
}
//  This is the single entry point for all calculator input, whether
//  it comes from onscreen buttons or keyboard events. The function
//  routes each action string to the appropriate handler function
//  and then calls render() to keep the display in sync
function dispatch(action, value) {
    switch (action) {
        case "num":
            if (value === undefined) {
                break;
            }
            inputIsDigit(value);
            break;
        case "decimal":
            inputDecimal();
            break;
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
            inputOperator(action);
            break;
        case "equals":
            evaluate();
            break;
        case "clear":
            resetState();
            break;
        case "percent":
            handlePercent();
            break;
        case "sign":
            handleSign();
            break;
    }
    render();
}
//  Here we have a single delegated click listener on the keypad
//  container. This means that one listener handles all buttons
//  rather than attaching separate listeners to each one
document.querySelector(".keypad")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    //  Ignore clicks on the keypad background that were not on a button
    if (!btn) {
        return;
    }
    //  btn.textContent provides the digit value for number buttons
    dispatch(btn.dataset.action ?? "", btn.textContent?.trim());
});
if (clearHistoryElement) {
    //  Wipe the history panel when the user clicks the "Clear History"
    //  button and reset the result display back to "0"
    clearHistoryElement.addEventListener("click", () => {
        state.history = []; //  Clear in memory log array
        historyListElement.innerHTML = ""; //  Remove all rendered <li> elements
        resultElement.textContent = "0"; //  Reset main displayto default value
    });
}
//  Map the physical keyboard key names to [action, value] pairs that match
//  the dispatch() function signature. This will allow full keyboard control
//  of the calculator without any separate keyboard handling logic.
const KEY_MAP = {
    "0": ["num", "0"], "1": ["num", "1"], "2": ["num", "2"],
    "3": ["num", "3"], "4": ["num", "4"], "5": ["num", "5"],
    "6": ["num", "6"], "7": ["num", "7"], "8": ["num", "8"],
    "9": ["num", "9"],
    ".": ["decimal"],
    "+": ["add"],
    "-": ["subtract"],
    "*": ["multiply"],
    "/": ["divide"],
    "Enter": ["equals"], //	Enter and "=" both confirm the expression
    "=": ["equals"],
    "Escape": ["clear"], //	Escape mirrors the on-screen AC/clear button
    "Backspace": ["clear"], //	Treat backspace as a full clear (no partial delete)
    "%": ["percent"],
};
document.addEventListener("keydown", (e) => {
    const mapping = KEY_MAP[e.key];
    if (mapping) {
        //  Suppress the browser's default behavior for
        //  mapped keys
        e.preventDefault();
        dispatch(mapping[0], mapping[1]);
    }
});
//	Initialize state and set first frame so the display isn't blank.
resetState();
render();
//# sourceMappingURL=calculator.js.map