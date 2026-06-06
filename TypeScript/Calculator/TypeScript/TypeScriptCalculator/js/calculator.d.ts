interface CalcState {
    current: string;
    previous: string | null;
    operator: string | null;
    waitForNext: boolean;
    history: string[];
}
type Operator = "add" | "subtract" | "multiply" | "divide";
type KeyMapEntry = readonly [string, string?];
declare const state: CalcState;
declare const resultElement: HTMLElement;
declare const expressionElement: HTMLElement;
declare const historyListElement: HTMLElement;
declare const clearHistoryElement: HTMLElement;
declare function render(): void;
declare function addHistoryEntry(entry: string): void;
declare function highlightOperator(op: string | null): void;
declare function resetState(seedValue?: string): void;
declare function inputIsDigit(digit: string): void;
declare function inputDecimal(): void;
declare function inputOperator(op: string): void;
declare function evaluate(): void;
declare function calculate(a: number, b: number, op: string | null): number;
declare function formatResult(res: number): string;
declare function handlePercent(): void;
declare function handleSign(): void;
declare function dispatch(action: string, value?: string): void;
declare const KEY_MAP: Record<string, [string, string?]>;
//# sourceMappingURL=calculator.d.ts.map