//  pieceWorker.jsPieceWorker constants, calculatePieceWorkerGrossPay(), 
//  and validateAndCalculatePieceWorker()
//  PieceWorker Employee
const MINPIECES           =     0;
const MAXPIECES           =   100;
const MINPPP              =     0.01;
const MAXPPP              =     1.00;
const pieceWorkerFieldSet = document.getElementById("pieceWorkerFields");
const totalPieceWorker   = document.getElementById("totalPieceWorker");

function calculatePieceWorkerGrossPay(pieces, price)
{
    let gross   = 0.0;
    let message = "";

    gross = pieces * price;

    message = `${pieces} pieces made x $${price.toFixed(2)} per piece`;

    return {grossPay: gross, message};
}

//  Read the pieceWorker specific fields and then validate them.
//  If they are valid then we are ready to delegate to
//  function calculatePieceWorkerGrossPay()
function validateAndCalculatePieceWorker()
{
    //  DOM references that are only used in this function
    const piecesMadeInput     = document.getElementById("piecesMade");
    const pricePerPieceInput  = document.getElementById("pricePerPiece");

    //  Validate the pieces made
    const piecesResult = validateNumericInput(
                                               piecesMadeInput, "Pieces Made",
                                               MINPIECES, MAXPIECES
                                             );

    //  If invalid, return with error message
    if (!piecesResult.valid)
    {
        return {success: false, message: piecesResult.message, focus: piecesMadeInputInput};
    }

    //  The pieces made was valid. Now validate the price per piece
    const priceResult = validateNumericInput(
                                              pricePerPieceInput, "Price Per Piece",
                                              MINPPP, MAXPPP
                                            );

    //  If invalid, return with error message
    if (!priceResult.valid)
    {
        return {success: false, message: priceResult.message, focus: pricePerPieceInput};
    }

    //  Both the pieces made and price per piece were valid.
    //  So perform the calculation.
    const calc = calculatePieceWorkerGrossPay(piecesResult.value, priceResult.value)

    //  return success
    return {success: true, grossPay: calc.grossPay, message: calc.message, error: "", focus: null}
}