declare const MINSALES: number;
declare const MAXSALES: number;
declare const MINPCT: number;
declare const MAXPCT: number;
declare const commissionFieldSet: HTMLFieldSetElement;
declare const totalCommission: HTMLElement;
interface CommissionCalcResult {
    grossPay: number;
    message: string;
}
declare function calculateCommissionGrossPay(sales: number, percentage: number): CommissionCalcResult;
interface CommissionValidateResult {
    success: boolean;
    grossPay?: number;
    message: string;
    error: string;
    focus: HTMLInputElement | null;
}
declare function validateAndCalculateCommission(): CommissionValidateResult;
//# sourceMappingURL=commission.d.ts.map