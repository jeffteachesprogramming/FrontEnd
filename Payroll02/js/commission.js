//  commission.jsCommission constants, calculateCommissionGrossPay(), 
//  and validateAndCalculateCommission()
//  Commission Employee
const MINSALES                  =      0.00;
const MAXSALES                  = 100000.00;
const MINPCT                    =      0.00;
const MAXPCT                    =      0.30;
const commissionFieldSet        = document.getElementById("commissionFields");
const totalCommission           = document.getElementById("totalCommission");

function calculateCommissionGrossPay(sales, percentage)
{
    let gross   = 0.0;
    let message = "";

    gross = sales * percentage;

    message = `${sales.toFixed(2)} sales amount x ${(percentage * 100).toFixed(0)}% commission percentage`;

    return {grossPay: gross, message};
}

//  Read the commission specific fields and then validate them.
//  If they are valid then we are ready to delegate to
//  function calculateCommissionGrossPay()
function validateAndCalculateCommission()
{
    //  DOM references that are only used in this function
    const salesAmountInput          = document.getElementById("salesAmount");
    const commissionPercentageInput = document.getElementById("commissionPercentage");

    //  Validate the sales amount
    const salesResult = validateNumericInput(
                                              salesAmountInput, "Sales Amount",
                                              MINSALES, MAXSALES
                                            );

    //  If invalid, return with error message
    if (!salesResult.valid)
    {
        return {success: false, message: salesResult.message, focus: salesAmountInput};
    }

    //  The sales amount was valid. Now validate the commission percentage
    const pctResult = validateNumericInput(
                                            commissionPercentageInput, "Commission Percentage",
                                            MINPCT, MAXPCT
                                          );

    //  If invalid, return with error message
    if (!pctResult.valid)
    {
        return {success: false, message: pctResult.message, focus: commissionPercentageInput};
    }

    //  Both the sales amount and commission percentage were valid.
    //  So perform the calculation.
    const calc = calculateCommissionGrossPay(salesResult.value, pctResult.value)

    //  return success
    return {success: true, grossPay: calc.grossPay, message: calc.message, error: "", focus: null}
}
