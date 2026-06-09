"use strict";
//  validation.js - Contains only validateNumericInput().
// 
//  Loaded first so every other file can call it.
//  This is our generic valiation function
function validateNumericInput(theInput, label, min, max) {
    //  Remove any/all leading & trailing spaces
    const trimmedTheInput = theInput.value.trim();
    //  Check for empty input
    if (trimmedTheInput === "") {
        return { valid: false, value: NaN, message: `${label} Is Required.` };
    }
    //  We had a numeric input. Set it then range check it
    const num = parseFloat(trimmedTheInput);
    //  Check for out-of-range (OOR) input
    if (num < min || num > max) {
        return { valid: false, value: num, message: `${label} Must Be Between ${min} And ${max}` };
    }
    //  We had valid numeric input
    return { valid: true, value: num, message: "" };
}
//# sourceMappingURL=validation.js.map