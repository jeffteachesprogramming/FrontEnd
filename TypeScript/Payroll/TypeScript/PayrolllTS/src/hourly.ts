//  hourly.jsHourly constants, calculateHourlyGrossPay(), and 
//  validateAndCalculateHourly()
//  Hourly Employee
const MINHOURS:       number =     0;
const MAXHOURS:       number =    84;
const MINHRATE:       number =     0.00;
const MAXHRATE:       number =    99.99;
const hourlyFieldSet: HTMLFieldSetElement   = document.getElementById("hourlyFields") as HTMLFieldSetElement;
const totalHourly:    HTMLElement           = document.getElementById("totalHourly")  as HTMLElement;

interface HourlyCalcResult
{
    grossPay:   number;
    message:    string;
}

function calculateHourlyGrossPay(hours: number, rate: number): HourlyCalcResult
{
    const MAXNONOT: number = 40.0;
    const OTRATE:   number =  1.5;
    let   theOT:    number =  rate * OTRATE;
    let gross:      number =  0.0;
    let otHours:    number =  0.0;
    let message:    string = "";

    //  Straight time (no OT)
    if (hours <= MAXNONOT)
    {
        gross   = hours * rate;

        message = `${hours} hours x $${rate.toFixed(2)} per hour`;
    }
    //  Overtime worked
    else
    {
        otHours = hours - MAXNONOT;

        gross   = MAXNONOT * rate + (otHours * theOT);

        message = `${MAXNONOT} hours × $${rate.toFixed(2)} + ${otHours} OT hrs × $${theOT.toFixed(2)}`;
    }

    return {grossPay: gross, message};
}

interface HourlyValidResult
{
    success:    boolean;
    grossPay?:  number;
    message:    string;
    error:      string;
    focus:      HTMLInputElement | null;
}

//  Read the hourly specific fields and then validate them.
//  If they are valid then we are ready to delegate to
//  function calculateHourlyGrossPay()
function validateAndCalculateHourly(): HourlyValidResult
{
    //  DOM references that are only used in this function
    const hoursWorkedInput: HTMLInputElement = document.getElementById("hoursWorked") as HTMLInputElement;
    const hourlyRateInput:  HTMLInputElement = document.getElementById("hourlyRate")  as HTMLInputElement;

    //  Validate the hours worked
    const hoursResult: ValidationResult = validateNumericInput
                                          (
                                                hoursWorkedInput, "Hours Worked",
                                                MINHOURS, MAXHOURS
                                          );
    
            
    if (!hoursResult.valid)
    {
        return {success: false, message: hoursResult.message, 
                error: hoursResult.message, focus: hoursWorkedInput};
    }

    //  The hours worked was valid. Now validate the hourly rate
    const rateResult = validateNumericInput
                                            (
                                                hourlyRateInput, "Hourly Rate",
                                                MINHRATE, MAXHRATE
                                            );
    
    //  If invalid, return with error message
    if (!rateResult.valid)
    {
        return {success: false, message: rateResult.message, 
                error: rateResult.message, focus: hourlyRateInput};
    }
       
    //  Both the hours worked and hourly rate were valid.
    //  So perform the calculation.
    const calc = calculateHourlyGrossPay(hoursResult.value, rateResult.value)

    //  return success
    return {success: true, grossPay: calc.grossPay, message: calc.message, error: "", focus: null}
}