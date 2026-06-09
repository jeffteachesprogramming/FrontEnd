//  salaried.jsSalaried constants, calculateSalariedGrossPay(), 
//  and validateAndCalculateSalaried()
//  Salaried Employee
const MINSAL           =      0.00;       
const MAXSAL           = 100000.00;
const salariedFieldSet = document.getElementById("salariedFields") as HTMLFieldSetElement;
const totalSalaried    = document.getElementById("totalSalaried")  as HTMLElement;

interface SalariedCalcResult
{
    grossPay: number;
    message:  string;
}

function calculateSalariedGrossPay(salary: number): SalariedCalcResult
{
   const gross: number    = salary;
   const message: string  = `$${salary.toFixed(2)} salary`;
 
    return {grossPay: gross, message};
}

interface SalariedValidateResult
{
    success:   boolean;
    grossPay?: number;
    message:   string;
    error:     string;
    focus:     HTMLInputElement | null;
}

//
function validateAndCalculateSalaried(): SalariedValidateResult
{
    const salariedInput: HTMLInputElement = document.getElementById("salary") as HTMLInputElement;

    //  Validate the salary
    const salResult    : ValidationResult = validateNumericInput
                                            (
                                                salariedInput, "Salary",
                                                MINSAL, MAXSAL
                                            );

    //  If invalid, return with error message
    if (!salResult.valid)
    {
        return {success: false, message: salResult.message, 
                error: salResult.message, focus: salariedInput};
    }

    //  The salary was valid. So perform the calculation.
    const calc: SalariedCalcResult = calculateSalariedGrossPay(salResult.value)

    //  return success
    return {success: true, grossPay: calc.grossPay, message: calc.message, error: "", focus: null}

}
