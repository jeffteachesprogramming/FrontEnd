//  commission.jsCommission constants, calculateCommissionGrossPay(), 
//  and validateAndCalculateCommission()
//  Commission Employee
const MINSALES:             number  =      0.00;
const MAXSALES:             number  = 100000.00;
const MINPCT:               number  =      0.00;
const MAXPCT:               number  =      0.30;
const commissionFieldSet        = document.getElementById("commissionFields") as HTMLFieldSetElement;
const totalCommission           = document.getElementById("totalCommission")  as HTMLElement;

interface CommissionCalcResult
{
    grossPay:   number;
    message:    string;
}

function calculateCommissionGrossPay(sales: number, percentage: number): CommissionCalcResult
{
    const gross: number   = sales * percentage;

    const message: string = `${sales.toFixed(2)} sales amount x ${(percentage * 100).toFixed(0)}% commission percentage`;

    return {grossPay: gross, message};
}

interface CommissionValidateResult
{
    success:    boolean;
    grossPay?:  number;
    message:    string;
    error:      string;
    focus:      HTMLInputElement | null;
}

//  Read the commission specific fields and then validate them.
//  If they are valid then we are ready to delegate to
//  function calculateCommissionGrossPay()
function validateAndCalculateCommission(): CommissionValidateResult
{
    //  DOM references that are only used in this function
    const salesAmountInput:          HTMLInputElement = document.getElementById("salesAmount") as HTMLInputElement;
    const commissionPercentageInput: HTMLInputElement = document.getElementById("commissionPercentage") as HTMLInputElement;

    //  Validate the sales amount
    const salesResult: ValidationResult = validateNumericInput
                                          (
                                              salesAmountInput, "Sales Amount",
                                              MINSALES, MAXSALES
                                          );

    //  If invalid, return with error message
    if (!salesResult.valid)
    {
        return {success: false, message: salesResult.message, error: salesResult.message,
                focus: salesAmountInput};
    }

    //  The sales amount was valid. Now validate the commission percentage
    const pctResult = validateNumericInput
                                           (
                                                commissionPercentageInput, "Commission Percentage",
                                                MINPCT, MAXPCT
                                           );

    //  If invalid, return with error message
    if (!pctResult.valid)
    {
        return {success: false, message: pctResult.message, 
                error: pctResult.message, focus: commissionPercentageInput};
    }

    //  Both the sales amount and commission percentage were valid.
    //  So perform the calculation.
    const calc = calculateCommissionGrossPay(salesResult.value, pctResult.value)

    //  return success
    return {success: true, grossPay: calc.grossPay, message: calc.message, error: "", focus: null}
}
