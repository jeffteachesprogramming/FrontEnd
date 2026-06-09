interface ValidationResult {
    valid: boolean;
    value: number;
    message: string;
}
declare function validateNumericInput(theInput: HTMLInputElement, label: string, min: number, max: number): ValidationResult;
//# sourceMappingURL=validation.d.ts.map