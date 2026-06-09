declare const MINPIECES: number;
declare const MAXPIECES: number;
declare const MINPPP: number;
declare const MAXPPP: number;
declare const pieceWorkerFieldSet: HTMLFieldSetElement;
declare const totalPieceWorker: HTMLElement;
interface PieceWorkerCalcResult {
    grossPay: number;
    message: string;
}
declare function calculatePieceWorkerGrossPay(pieces: number, price: number): PieceWorkerCalcResult;
interface PieceWorkerValidateResult {
    success: boolean;
    grossPay?: number;
    message: string;
    error: string;
    focus: HTMLInputElement | null;
}
declare function validateAndCalculatePieceWorker(): PieceWorkerValidateResult;
//# sourceMappingURL=pieceworker.d.ts.map