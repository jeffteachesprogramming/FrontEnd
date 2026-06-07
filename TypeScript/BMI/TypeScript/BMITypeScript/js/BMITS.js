"use strict";
/*
    This program is a simple body mass index (BMI) calculator.
    The user inputs their height in inches and their weight in
    pound (a.k.a. the imperial formula).

    From there, the BMI is calculated using the formula:
        bmi = (weight / (height * height) * 703)
    
    The following arbitrary constants are used in the program:
        MINHEIGHT   =   12      Minimum allowed input height
        MAXHEIGHT   =   96      Maximum allowed input height
        MINWEIGHT   =    1      Minimum allowed input weight
        MAXWEIGHT   =  777      Maximum allowed input weight
        MINOPTIMAL  =   18.50   Minimum optimal weight status
        MINOVER     =   25.00   Minimum overweight status
        MINOBESE    =   30.00   Minimum obese status
    
    From there, the BMI status is calculated using the following:
        bmi <  18.50                =   Status of Underweight
        bmi >= 18.50 && < 25.00     =   Status of Optimal weight
        bmi >= 25.00 && < 30.00     =   Status of Overweight
        bmi >= 30.00                =   Status of Obese

    Running totals of each status shown above are tracked so
    that the user may input multiple height/weight combinations.
    These running totals are displayed in a modal overlay when
    the user clicks the Show Totals button.
 */
//  Input Validation constants
const MINHEIGHT = 12;
const MAXHEIGHT = 96;
const MINWEIGHT = 1;
const MAXWEIGHT = 777;
//  BMI Status constants
const MINOPTIMAL = 18.50;
const MINOVER = 25.00;
const MINOBESE = 30.00;
//  BMI Status Type Accumulators
let totalUnderweight = 0;
let totalOptimalWeight = 0;
let totalOverweight = 0;
let totalObese = 0;
//  Helper function
//  TypeScript will expect an HTMLElement of subtype T.
//  It will throw a descriptive error at runtime if the
//  element cannot be found. This will eliminate the
//  repetitive null checks throughout the remainder of
//  the code
function getElement(id) {
    const theElement = document.getElementById(id);
    if (!theElement) {
        throw new Error(`Element with id "${id}" not found in the DOM.`);
    }
    return theElement;
}
//  This function will calculate the BMI using the following formula:
//      bmi = (weight / (height * height) * 703)
function calculateBMI(heightInInches, weightInPounds) {
    return (weightInPounds / (heightInInches * heightInInches) * 703).toFixed(2);
}
//  This function will calculate the BMI status using the BMI in
//  conjunction with the BMI Status Constants shown above.
function calculateBMIStatus(bmi) {
    let status = "";
    if (bmi < MINOPTIMAL) {
        //  BMI < 18.50
        status = "Underweight";
        ++totalUnderweight;
    }
    else if (bmi < MINOVER) {
        //  BMI >= 18.50 && < 25.00
        status = "Optimal weight";
        ++totalOptimalWeight;
    }
    else if (bmi < MINOBESE) {
        //  BMI >= 25.00 && < 30.00
        status = "Overweight";
        ++totalOverweight;
    }
    else {
        //  BMI >= 30.00
        status = "Obese";
        ++totalObese;
    }
    return status;
}
//  This function will populate the BMI Total modal overlay
//  with the current accumulator values for each BMI status
//  type. It will be invisible until the user clicks the
//  Show Totals button.
function openOverlay() {
    //  Write out the current value for each accumulator
    //  into the overlay's <span> elements
    getElement('totalUnderweight').textContent =
        String(totalUnderweight);
    getElement('totalOptimalWeight').textContent =
        String(totalOptimalWeight);
    getElement('totalOverweight').textContent =
        String(totalOverweight);
    getElement('totalObese').textContent =
        String(totalObese);
    //  Add the visible class to display the overlay
    getElement('totalsOverlay').classList.add('visible');
}
//  This function will close (hide) the BMI Totals Overlay. This
//  is done by removing the CSS class visible
function closeOverlay() {
    getElement('totalsOverlay').classList.remove('visible');
}
//  Event Listeners
//  Calculate Button
getElement('calculateBtn').addEventListener("click", function () {
    const heightInput = getElement('height');
    const weightInput = getElement('weight');
    const height = parseInt(heightInput.value, 10);
    const weight = parseInt(weightInput.value, 10);
    //  Height validation
    if (isNaN(height) || height < MINHEIGHT || height > MAXHEIGHT) {
        alert(`Please Enter a Height Between ${MINHEIGHT} and ${MAXHEIGHT} Inches`);
        heightInput.value = "";
        heightInput.focus();
        return;
    }
    //  Weight validation
    if (isNaN(weight) || weight < MINWEIGHT || weight > MAXWEIGHT) {
        alert(`Please Enter a Weight Between ${MINWEIGHT} and ${MAXWEIGHT} Pounds`);
        weightInput.value = "";
        weightInput.focus();
        return;
    }
    //  Both the height and the weight are valid.
    //  Calculate the BMI, then calculate the
    //  BMI status
    const bmiString = calculateBMI(height, weight);
    const bmiNumber = parseFloat(bmiString);
    const bmiStatus = calculateBMIStatus(bmiNumber);
    //  Display the calculated BMI in the result area
    getElement('bmiValue').textContent = bmiString;
    //  Display the calculated BMI status in the result area
    getElement('bmiStatus').textContent = `Category: ${bmiStatus}`;
});
//  Clear Form Button
getElement('clearFormBtn').addEventListener("click", function () {
    getElement('height').value = "";
    getElement('weight').value = "";
    getElement('bmiValue').textContent = "";
    getElement('bmiCategory').textContent = "";
});
//  Show Totals Button
getElement('showTotalsBtn').addEventListener("click", function () {
    openOverlay();
});
//  Close Overlay Button
getElement('closeTotalsBoxBtn').addEventListener("click", function () {
    closeOverlay();
});
//# sourceMappingURL=BMITS.js.map