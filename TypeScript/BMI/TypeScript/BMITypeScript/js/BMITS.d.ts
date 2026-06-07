declare const MINHEIGHT: number;
declare const MAXHEIGHT: number;
declare const MINWEIGHT: number;
declare const MAXWEIGHT: number;
declare const MINOPTIMAL: number;
declare const MINOVER: number;
declare const MINOBESE: number;
declare let totalUnderweight: number;
declare let totalOptimalWeight: number;
declare let totalOverweight: number;
declare let totalObese: number;
declare function getElement<T extends HTMLElement>(id: string): T;
declare function calculateBMI(heightInInches: number, weightInPounds: number): string;
declare function calculateBMIStatus(bmi: number): string;
declare function openOverlay(): void;
declare function closeOverlay(): void;
//# sourceMappingURL=BMITS.d.ts.map