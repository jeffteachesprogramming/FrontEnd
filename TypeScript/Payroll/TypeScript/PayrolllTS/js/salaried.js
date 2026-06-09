"use strict";
//  salaried.jsSalaried constants, calculateSalariedGrossPay(), 
//  and validateAndCalculateSalaried()
//  Salaried Employee
const MINSAL = 0.00;
const MAXSAL = 100000.00;
const salariedFieldSet = document.getElementById("salariedFields");
const totalSalaried = document.getElementById("totalSalaried");
function calculateSalariedGrossPay(salary) {
    const gross = salary;
    const message = `$${salary.toFixed(2)} salary`;
    return { grossPay: gross, message };
}
//
function validateAndCalculateSalaried() {
    const salariedInput = document.getElementById("salary");
    //  Validate the salary
    const salResult = validateNumericInput(salariedInput, "Salary", MINSAL, MAXSAL);
    //  If invalid, return with error message
    if (!salResult.valid) {
        return { success: false, message: salResult.message,
            error: salResult.message, focus: salariedInput };
    }
    //  The salary was valid. So perform the calculation.
    const calc = calculateSalariedGrossPay(salResult.value);
    //  return success
    return { success: true, grossPay: calc.grossPay, message: calc.message, error: "", focus: null };
}
//# sourceMappingURL=salaried.js.map