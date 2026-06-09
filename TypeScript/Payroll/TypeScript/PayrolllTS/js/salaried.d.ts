declare const MINSAL = 0;
declare const MAXSAL = 100000;
declare const salariedFieldSet: HTMLFieldSetElement;
declare const totalSalaried: HTMLElement;
interface SalariedCalcResult {
    grossPay: number;
    message: string;
}
declare function calculateSalariedGrossPay(salary: number): SalariedCalcResult;
interface SalariedValidateResult {
    success: boolean;
    grossPay?: number;
    message: string;
    error: string;
    focus: HTMLInputElement | null;
}
declare function validateAndCalculateSalaried(): SalariedValidateResult;
//# sourceMappingURL=salaried.d.ts.map