declare const MINHOURS: number;
declare const MAXHOURS: number;
declare const MINHRATE: number;
declare const MAXHRATE: number;
declare const hourlyFieldSet: HTMLFieldSetElement;
declare const totalHourly: HTMLElement;
interface HourlyCalcResult {
    grossPay: number;
    message: string;
}
declare function calculateHourlyGrossPay(hours: number, rate: number): HourlyCalcResult;
interface HourlyValidResult {
    success: boolean;
    grossPay?: number;
    message: string;
    error: string;
    focus: HTMLInputElement | null;
}
declare function validateAndCalculateHourly(): HourlyValidResult;
//# sourceMappingURL=hourly.d.ts.map