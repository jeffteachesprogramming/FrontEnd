"use strict";
//  script.jsAll DOM references, accumulators, UI helpers, event listeners, 
//  and onCalculate() — which now just calls the module's 
//  validateAndCalculate() function and handles the result
//  Accumulators
let totalHourlyGrossPays = 0;
let totalPieceWorkerGrossPays = 0;
let totalCommissionGrossPays = 0;
let totalSalariedGrossPays = 0;
//  DOM References
const hoursWorkedInput = document.getElementById("hoursWorked");
const hourlyRateInput = document.getElementById("hourlyRate");
const piecesMadeInput = document.getElementById("piecesMade");
const pricePerPieceInput = document.getElementById("pricePerPiece");
const salesAmountInput = document.getElementById("salesAmount");
const commissionPercentageInput = document.getElementById("commissionPercentage");
const salariedInput = document.getElementById("salary");
//  Input Variables
const employeeTypeSelect = document.getElementById("employeeType");
//  FieldSet Variables
//  FiedSet Array
const allFieldSets = [
    hourlyFieldSet,
    pieceWorkerFieldSet,
    commissionFieldSet,
    salariedFieldSet
];
//  Buttons
const btnCalculate = document.getElementById("btnCalculate");
const btnClear = document.getElementById("btnClear");
const btnShowTotals = document.getElementById("btnShowTotals");
const btnCloseModal = document.getElementById("btnCloseModal");
//  Result Area Variables
const resultsPlaceholder = document.getElementById("resultsPlaceholder");
const resultsList = document.getElementById("resultsList");
const errorMsg = document.getElementById("errorMsg");
//  Totals Variables
const totalsModal = document.getElementById("totalsModal");
const grandTotal = document.getElementById("grandTotal");
//  Make sure that when we change employeeType it is handled correctly
//  First, hide every employeeType fieldset. Call this before actually
//  showing the correct fieldset.
function hideAllFieldSets() {
    allFieldSets.forEach((fs) => fs.classList.add('hidden'));
}
//  Other helper functions
//  Show any errors
function showErrors(message) {
    errorMsg.textContent = message;
}
//  Clear all errors
function clearErrors() {
    errorMsg.textContent = "";
}
//  Format an amount to currency
function formatToCurrency(amount) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
//  Next when the employeeType changes, show the matching
//  fieldset.
function onEmployeeTypeChange() {
    const empType = employeeTypeSelect.value;
    //  Clear any existing error messages
    clearErrors();
    //  Hide all fieldsets
    hideAllFieldSets();
    //  Then show the selected fieldset
    switch (empType) {
        case "hourly":
            hourlyFieldSet.classList.remove("hidden");
            //  Move the focus to the first hourlyFieldSet input
            hoursWorkedInput.focus();
            break;
        case "pieceWorker":
            pieceWorkerFieldSet.classList.remove("hidden");
            //  Move the focus to the first pieceWorkerFieldSet input
            piecesMadeInput.focus();
            break;
        case "commission":
            commissionFieldSet.classList.remove("hidden");
            //  Move the focus to the first commissionFieldSet input
            salesAmountInput.focus();
            break;
        case "salaried":
            salariedFieldSet.classList.remove("hidden");
            //  Move the focus to the first salariedFieldSet input
            salariedInput.focus();
            break;
        default:
            return;
    }
}
//  Append a new result card to the results list panel.
//  Also hide the placeholder text if this is the first entry.
function appendResult(typeLabel, grossPay, message) {
    resultsPlaceholder.classList.add("hidden");
    //  Build the list item (li).
    const li = document.createElement("li");
    li.classList.add("resultItem");
    li.innerHTML =
        `<span class="resultType">${typeLabel}</span>
        <span class="resultAmount">${formatToCurrency(grossPay)}</span>
        <span class="resultMessage">${message}</span>`;
    //  Prepend so newest element will appear on top
    resultsList.insertBefore(li, resultsList.firstChild);
}
//  Update the modal totals display with the current values of
//  the accumulators. This will be called each time the Show
//  Totals button is clicked.
function refreshModalTotals() {
    const grandTotalAmt = totalHourlyGrossPays + totalPieceWorkerGrossPays +
        totalCommissionGrossPays + totalSalariedGrossPays;
    document.getElementById("totalHourly").textContent = formatToCurrency(totalHourlyGrossPays);
    document.getElementById("totalPieceWorker").textContent = formatToCurrency(totalPieceWorkerGrossPays);
    document.getElementById("totalCommission").textContent = formatToCurrency(totalCommissionGrossPays);
    document.getElementById("totalSalaried").textContent = formatToCurrency(totalSalariedGrossPays);
    grandTotal.textContent = formatToCurrency(grandTotalAmt);
}
//  Main calculation handler. Handle the situation whenever a user
//  clicks the btnCalculate button. It will validate the selected
//  employee type and its associated input. It will then compute
//  the gross pay, update the associated accumulator, and append
//  the result to the results panel.
function onCalculate() {
    clearErrors();
    //  Validate employee type
    const type = employeeTypeSelect.value;
    if (!type) {
        showErrors("Please Select An Employee Type!");
        employeeTypeSelect.focus();
        return;
    }
    let grossPay = 0;
    let typeLabel = "";
    let message = "";
    switch (type) {
        case "hourly":
            {
                const result = validateAndCalculateHourly();
                if (!result.success) {
                    showErrors(result.message);
                    result.focus?.focus();
                    return;
                }
                grossPay = result.grossPay ?? 0;
                message = result.message;
                typeLabel = "Hourly Employee";
                totalHourlyGrossPays += grossPay;
                break;
            }
        case "pieceWorker":
            {
                const result = validateAndCalculatePieceWorker();
                if (!result.success) {
                    showErrors(result.message);
                    result.focus?.focus();
                    return;
                }
                grossPay = result.grossPay ?? 0;
                message = result.message;
                typeLabel = "PieceWorker Employee";
                totalPieceWorkerGrossPays += grossPay;
                break;
            }
        case "commission":
            {
                const result = validateAndCalculateCommission();
                if (!result.success) {
                    showErrors(result.message);
                    result.focus?.focus();
                    return;
                }
                grossPay = result.grossPay ?? 0;
                message = result.message;
                typeLabel = "Commission Employee";
                totalCommissionGrossPays += grossPay;
                break;
            }
        case "salaried":
            {
                const result = validateAndCalculateSalaried();
                if (!result.success) {
                    showErrors(result.message);
                    result.focus?.focus();
                    return;
                }
                grossPay = result.grossPay ?? 0;
                message = result.message;
                typeLabel = "Salaried Employee";
                totalSalariedGrossPays += grossPay;
                break;
            }
        default:
            showErrors("Unknown Employee Type. Please Try Again");
            break;
    }
    //  Show the results in the results panel
    appendResult(typeLabel, grossPay, message);
}
//  Calculate each gross pay function
//  Clear handler. It will reset the form completely. It will
//  clear all inputs, hide the employee type-specific fieldsets,
//  and reset the results area. It will not reset the
//  accumulator totals.
function onClear() {
    //  Reset the employee type dropdown
    employeeTypeSelect.value = "";
    //  Clear all of the numeric inputs
    const inputs = [
        hoursWorkedInput, hourlyRateInput,
        piecesMadeInput, pricePerPieceInput,
        salesAmountInput, commissionPercentageInput,
        salariedInput
    ];
    inputs.forEach((input) => {
        input.value = "";
    });
    //  Hide all employee type-specific fieldsets
    hideAllFieldSets();
    //  Clear any error messages
    clearErrors();
    //  Clear the results list and restore the placeholders
    resultsList.innerHTML = "";
    resultsPlaceholder.classList.remove("hidden");
    //  Return the focus to the dropdown
    employeeTypeSelect.focus();
}
//  The openModal() will open the accumulator totals modal.
//  It refreshes the displayed values before showing them,
//  so that all totals are up-to-date.
function openModal() {
    refreshModalTotals();
    totalsModal.classList.remove("hidden");
    //  Move the focus into the modal
    btnCloseModal.focus();
}
//  The closeModal() will close the accumulator totals modal
//  return the focus to the buttonthat opened it.
function closeModal() {
    totalsModal.classList.add("hidden");
    btnShowTotals.focus();
}
//  Wire up the buttons accordingly
btnCalculate.addEventListener("click", onCalculate);
btnClear.addEventListener("click", onClear);
btnShowTotals.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
//  Close the modal when clicking outside of the modal box
totalsModal.addEventListener("click", (e) => {
    //  Only want to if the click is on the overlay
    if (e.target === totalsModal) {
        closeModal();
    }
});
//  Allow the user to press <etner> for the Calculate button
//  (this has already been defined as the default for <button>)
btnCalculate.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        onCalculate();
    }
});
//  onEmployeeTypeChange() event handler
employeeTypeSelect.addEventListener("change", onEmployeeTypeChange);
//  Initialization. This will be the code to run on page load.
//  It will be called once the script is parsed and the DOM
//  is ready. It will ensure that the form starts in a clean
//  state regardless of any browser default behavior.
(function init() {
    //  Make sure no employee type has been preselected
    employeeTypeSelect.value = "";
    //  Hide all fieldsets
    hideAllFieldSets();
    //  Clear all inputs
    const inputs = [
        hoursWorkedInput, hourlyRateInput,
        piecesMadeInput, pricePerPieceInput,
        salesAmountInput, commissionPercentageInput,
        salariedInput
    ];
    inputs.forEach((input) => {
        input.value = "";
    });
    //  Ensure that the error area is blank
    clearErrors();
    //  Place focus on the employee type dropdown
    employeeTypeSelect.focus();
})();
//# sourceMappingURL=payroll.js.map