/*
    This will be a fully functional 4 feature
    (+, -, *, /) calculator.

    In addition, it will also have:

    1.  A live display (expression + current value).
    2.  History log (click any entry to reload it).
    3.  Keyboard support.
    4.  Operator highlight feedback.
 */

//  This object will hold everything the calculator
//  needs to know.
const state =
{
    current:        "0",    //  What is shown in the result display
    previous:       null,   //  The left hand operand
    operator:       null,   //  +, -, *, /
    waitForNext:    false,  //  True right after an operator is pressed
    history:        [],     //  Array of past expression=result strings
}

//  DOM references
const resultElement       = document.getElementById("result");          //  Answer
const expressionElement   = document.getElementById("expression");      //  Expression
const historyListElement  = document.getElementById("historyList");     //  Past calculations
const clearHistoryElement = document.getElementById("clearHistory");    //  Wipe history panel

//  Helper functions

//  Update both display lines (expression & result) from current state
function render()
{
    //  Current working number in our main display
    resultElement.textContent = state.current;

    //  Only show the expression line when there is
    //  actually a pending operation to display
    if (state.previous !== null && state.operator)
    {
        //  Give user visual confirmation
        expressionElement.textContent = `${state.previous} ${state.operator}`;
    }
    else
    {
        expressionElement.textContent = "";
    }
}

//  Add on entry to the onscreen history list
//  This will be a new <li> for the completed
//  calculation. It will be appended to the
//  history panel
function addHistoryEntry(entry)
{
    state.history.push(entry);

    const li = document.createElement("li");

    //  Clicking a history item will restore its result value
    li.addEventListener("click", () =>
    {
        const parts = entry.split("=");
        const val   = parts[parts.length -1].trim();

        //  Seed the calculator with the value and also
        //  clear any pending operation
        resetState(val);
        render();
    });

    li.textContent = entry;
    historyListElement.appendChild(li);

    //  Auto scroll to newest entry
    historyListElement.parentElement.scrollTop =
                historyListElement.parentElement.scrollHeight;
}

//  Highlight the active operator button and clear all others
//  so the user knows what operation is currently pending
function highlightOperator(op)
{
    document.querySelectorAll(".btnOperation").forEach(btn =>
    {
        // The btn.dataset holds the operation name (e.g. "+") 
        //  toggle the active class only on the button that
        //  matches this operator
        btn.classList.toggle("active", btn.dataset.action === op);
    });
}

//  Mutators

//  Wipes the calculator back to a clean slate
//  Accepts any optional seed value so the history
//  recall can prepopulate the display with the
//  previous result
function resetState(seedValue)
{
    //  If there is no seed, show "0" as the default display
    state.current       = seedValue !== undefined ? String(seedValue) : "0";
    state.previous      = null;     //  No left hand operand pending
    state.operator      = null;     //  No operator pending
    state.waitForNext   = false;    //  
    highlightOperator(null);        //  Remove any operator button highlight
}

//  Append a singl digit character to the current display value
function inputDigit(digit)
{
    if (state.waitForNext)
    {
        //  Operator pressed so start a new member as opposed
        //  to taking the digit onto the previous result
        state.current       = digit;
        state.waitForNext   = false;
    }
    else
    {
        //  Replace the "0" to avoid leading zero
        //  Otherwise concatenate
        state.current = state.current === "0" ? digit : state.current + digit;
    }
}

//  Handle the "." button. Make sure there is a maximum
//  of one decimal point in each inputted number
function inputDecimal()
{
    if (state.waitForNext)
    {
        state.current       = "0.";      //  e.g. 0.33 vs. .33
        state.waitForNext   = false;

        return;
    }

    //  Only insert the decimal point if the number does
    //  not currently have a decimal point in it
    if (!state.current.includes("."))
    {
        state.current += ".";
    }
}

//  This functin will be called whenever one of the operator
//  buttons (+, -, *, /) is pressed. It saved the current
//  value as the left hand operator and gets ready to add
//  the mathematical operator shown above in the ().
function inputOperator(op)
{
    //  The right hand side of what we are working on
    const value = parseFloat(state.current);

    //  The !state.waitForNext guard shown below
    //  will prevent the user from entering two
    //  operators in a row, e.g. ++.
    if (state.previous !== null && !state.waitForNext)
    {
        const result  = calculate(parseFloat(state.previous), value, state.operator);
        state.current = formatResult(result);
    }

    state.previous      = state.current;    //  Save as new left hand operand
    state.operator      = op;               //  Get ready to use new operator
    state.waitForNext   = true;             //  Next digit starts right hand operator

    highlightOperator(op);                  //  Light up pressed operator button
    render();                               //  Update display immediately
}

//  Called by user clicking the "=" button. COmputes the pending
//  operation and then logs it to history
function evaluate()
{
    //  If there is no stored left hand operand or operator, return
    if (state.previous === null || state.operator === null)
    {
        return;
    }

    const left   = parseFloat(state.previous);
    const right  = parseFloat(state.current);
    const result = calculate(left, right, state.operator);

    //  Build a human readable log entry before
    //  we mutate the state
    const entry = `${state.previous} ${state.operator} ${state.current} = ${formatResult(result)}`;
    addHistoryEntry(entry);

    //  Update the display with the final result
    state.current     = formatResult(result);
    state.previous    = null;                   //  Clear the left hand operator
    state.operator    = null;
    state.waitForNext = true;                   //  If user types a digit, start anew

    highlightOperator(null);                    //  Remvoe operator button highlight
}

//  This function takes two numbers and an operator string
//  and returns a number.
function calculate(a, b, op)
{
    switch (op)
    {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "multiply":
            return a * b;

        case "divide":
            if (b === 0)
            {
                return NaN;
            }

            return a / b;

        default:
            return b;
    }
}

//  Convert a raw JavaScript number to a string
//  for better display purposes
function formatResult(res)
{
    if (isNaN(res))
    {
        return "Error";             //  Divde by 0 error
    }

    if (!isFinite(res))
    {
        return "Error";             //  Handle +Infinity or -Infinity
    }

    //  We will set the toPrecision(12) to limint
    //  significant digits
    const str = parseFloat(res.toPrecision(12)).toString();
    return str;
}

//  Express current value as a fraction of 100
function handlePercent()
{
    state.current     = formatResult(parseFloat(state.current) / 100);
    state.waitForNext = false;
}

//  Flip the sign of the displayed number from + to - or - to +
function handleSign()
{
    const n = parseFloat(state.current);
    
    if (n != 0)
    {
        state.current = formatResult(-n);
    }
}

//  Entry point for all user input
function dispatch(action, value)
{
    switch (action)
    {
        case "num":
            inputDigit(value);
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

        default:
            break;
    }

    //  Rerender after ever action so display kept in sync
    render();
}

document.querySelector(".keypad").addEventListener("click", (e) =>
{
    const btn = e.target.closest(".btn");

    if (!btn)
    {
        return;
    }

    dispatch(btn.dataset.action, btn.textContent.trim());
});

if (clearHistoryElement)
{
    //  Wipe the history panel when the user clicks "Clear History"
    //  and finally, clear the results panel value as well
    clearHistoryElement.addEventListener("click", () =>
    {
        state.history                = [];  //  Clear the in-memory log
        historyListElement.innerHTML = "";  //  Remove all <li> elements from DOM
        resultElement.textContent    = "0";
    });
}

//	Map the physical key names to [action, value] 
//	pairs that match the dispatch() signature.
const KEY_MAP = {
  "0": ["num", "0"], "1": ["num", "1"], "2": ["num", "2"],
  "3": ["num", "3"], "4": ["num", "4"], "5": ["num", "5"],
  "6": ["num", "6"], "7": ["num", "7"], "8": ["num", "8"],
  "9": ["num", "9"],
  ".":         ["decimal"],
  "+":         ["add"],
  "-":         ["subtract"],
  "*":         ["multiply"],
  "/":         ["divide"],
  "Enter":     ["equals"],  //	Enter and "=" both confirm the expression
  "=":         ["equals"],
  "Escape":    ["clear"],   //	Escape mirrors the on-screen AC/clear button
  "Backspace": ["clear"],   //	Treat backspace as a full clear (no partial delete)
  "%":         ["percent"],
};

document.addEventListener("keydown", (e) => 
{
	const mapping = KEY_MAP[e.key];
	if (mapping)
	{
		e.preventDefault();
		dispatch(mapping[0], mapping[1]);
	}
});

//	Initialize state and set first frame so the display isn't blank.
resetState();
render();