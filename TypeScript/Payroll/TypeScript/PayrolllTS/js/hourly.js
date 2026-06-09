"use strict";
//  hourly.jsHourly constants, calculateHourlyGrossPay(), and 
//  validateAndCalculateHourly()
//  Hourly Employee
const MINHOURS = 0;
const MAXHOURS = 84;
const MINHRATE = 0.00;
const MAXHRATE = 99.99;
const hourlyFieldSet = document.getElementById("hourlyFields");
const totalHourly = document.getElementById("totalHourly");
function calculateHourlyGrossPay(hours, rate) {
    const MAXNONOT = 40.0;
    const OTRATE = 1.5;
    let theOT = rate * OTRATE;
    let gross = 0.0;
    let otHours = 0.0;
    let message = "";
    //  Straight time (no OT)
    if (hours <= MAXNONOT) {
        gross = hours * rate;
        message = `${hours} hours x $${rate.toFixed(2)} per hour`;
    }
    //  Overtime worked
    else {
        otHours = hours - MAXNONOT;
        gross = MAXNONOT * rate + (otHours * theOT);
        message = `${MAXNONOT} hours × $${rate.toFixed(2)} + ${otHours} OT hrs × $${theOT.toFixed(2)}`;
    }
    return { grossPay: gross, message };
}
//  Read the hourly specific fields and then validate them.
//  If they are valid then we are ready to delegate to
//  function calculateHourlyGrossPay()
function validateAndCalculateHourly() {
    //  DOM references that are only used in this function
    const hoursWorkedInput = document.getElementById("hoursWorked");
    const hourlyRateInput = document.getElementById("hourlyRate");
    //  Validate the hours worked
    const hoursResult = validateNumericInput(hoursWorkedInput, "Hours Worked", MINHOURS, MAXHOURS);
    if (!hoursResult.valid) {
        return { success: false, message: hoursResult.message,
            error: hoursResult.message, focus: hoursWorkedInput };
    }
    //  The hours worked was valid. Now validate the hourly rate
    const rateResult = validateNumericInput(hourlyRateInput, "Hourly Rate", MINHRATE, MAXHRATE);
    //  If invalid, return with error message
    if (!rateResult.valid) {
        return { success: false, message: rateResult.message,
            error: rateResult.message, focus: hourlyRateInput };
    }
    //  Both the hours worked and hourly rate were valid.
    //  So perform the calculation.
    const calc = calculateHourlyGrossPay(hoursResult.value, rateResult.value);
    //  return success
    return { success: true, grossPay: calc.grossPay, message: calc.message, error: "", focus: null };
}
//# sourceMappingURL=hourly.js.map