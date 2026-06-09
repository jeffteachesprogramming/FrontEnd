//  pieceWorker.jsPieceWorker constants, calculatePieceWorkerGrossPay(), 
//  and validateAndCalculatePieceWorker()
//  PieceWorker Employee
const MINPIECES:            number           =     0;
const MAXPIECES:            number           =   100;
const MINPPP:               number           =     0.01;
const MAXPPP:               number           =     1.00;
const pieceWorkerFieldSet = document.getElementById("pieceWorkerFields") as HTMLFieldSetElement;
const totalPieceWorker   = document.getElementById("totalPieceWorker")   as HTMLElement;

interface PieceWorkerCalcResult
{
    grossPay:   number;
    message:    string;
}

function calculatePieceWorkerGrossPay(pieces: number, price: number): PieceWorkerCalcResult
{
    const gross:    number   = pieces * price;
    const message:  string   = `${pieces} pieces made x $${price.toFixed(2)} per piece`;

    return {grossPay: gross, message};
}

interface PieceWorkerValidateResult
{
    success:    boolean;
    grossPay?:  number;
    message:    string;
    error:      string;
    focus:      HTMLInputElement | null;
}

//  Read the pieceWorker specific fields and then validate them.
//  If they are valid then we are ready to delegate to
//  function calculatePieceWorkerGrossPay()
function validateAndCalculatePieceWorker(): PieceWorkerValidateResult
{
    //  DOM references that are only used in this function
    const piecesMadeInput:      HTMLInputElement = document.getElementById("piecesMade")    as HTMLInputElement;
    const pricePerPieceInput:   HTMLInputElement = document.getElementById("pricePerPiece") as HTMLInputElement;

    //  Validate the pieces made
    const piecesResult: ValidationResult =  validateNumericInput
                                            (
                                               piecesMadeInput, "Pieces Made",
                                               MINPIECES, MAXPIECES
                                            );

    //  If invalid, return with error message
    if (!piecesResult.valid)
    {
        return {success: false, message: piecesResult.message, 
                error: piecesResult.message, focus: piecesMadeInput};
    }

    //  The pieces made was valid. Now validate the price per piece
    const priceResult = validateNumericInput
                                            (
                                                pricePerPieceInput, "Price Per Piece",
                                                MINPPP, MAXPPP
                                            );

    //  If invalid, return with error message
    if (!priceResult.valid)
    {
        return {success: false, message: priceResult.message, 
                error: priceResult.message, focus: pricePerPieceInput};
    }

    //  Both the pieces made and price per piece were valid.
    //  So perform the calculation.
    const calc = calculatePieceWorkerGrossPay(piecesResult.value, priceResult.value)

    //  return success
    return {success: true, grossPay: calc.grossPay, message: calc.message, error: "", focus: null}
}