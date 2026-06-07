/*
    This program is a simple body mass index (BMI) calculator.
    The user inputs their height in inches and their weight in
    pound (a.k.a. the imperial formula).

    From there, the BMI is calculated using the formula:
        bmi = (weight / (height * height) * 703)
    
    The following arbitrary constants are used in the program:
        MINHEIGHT   =   12      Minimum allowed input height
        MAXHEIGHT   =   96      Maximum allowed input height
        MINWEIGHT   =    1      Minimum allowed input weight
        MAXWEIGHT   =  777      Maximum allowed input weight
        MINOPTIMAL  =   18.50   Minimum optimal weight status
        MINOVER     =   25.00   Minimum overweight status
        MINOBESE    =   30.00   Minimum obese status
    
    From there, the BMI status is calculated using the following:
        bmi <  18.50                =   Status of Underweight
        bmi >= 18.50 && < 25.00     =   Status of Optimal weight
        bmi >= 25.00 && < 30.00     =   Status of Overweight
        bmi >= 30.00                =   Status of Obese

    Running totals of each status shown above are tracked so
    that the user may input multiple height/weight combinations.
    These running totals are displayed in a modal overlay when
    the user clicks the Show Totals button.
 */

    //  Input Validation constants
    const MINHEIGHT: number =  12;
    const MAXHEIGHT: number =  96;
    const MINWEIGHT: number =   1;
    const MAXWEIGHT: number = 777;

    //  BMI Status constants
    const MINOPTIMAL: number = 18.50;
    const MINOVER:    number = 25.00;
    const MINOBESE:   number = 30.00;

    //  BMI Status Type Accumulators
    let totalUnderweight:   number = 0;
    let totalOptimalWeight: number = 0;
    let totalOverweight:    number = 0;
    let totalObese:         number = 0;

    //  Helper function
    //  TypeScript will expect an HTMLElement of subtype T.
    //  It will throw a descriptive error at runtime if the
    //  element cannot be found. This will eliminate the
    //  repetitive null checks throughout the remainder of
    //  the code
    function getElement<T extends HTMLElement>(id: string): T
    {
        const theElement = document.getElementById(id) as T | null;

        if (!theElement)
        {
            throw new Error(`Element with id "${id}" not found in the DOM.`);
        }

        return theElement;
    }

    //  This function will calculate the BMI using the following formula:
    //      bmi = (weight / (height * height) * 703)
    function calculateBMI(heightInInches: number, weightInPounds: number): string
    {
        return (weightInPounds / (heightInInches * heightInInches) * 703).toFixed(2);
    }

    //  This function will calculate the BMI status using the BMI in
    //  conjunction with the BMI Status Constants shown above.
    function calculateBMIStatus(bmi: number): string
    {
        let status: string = "";

        if (bmi < MINOPTIMAL)
        {
            //  BMI < 18.50
            status = "Underweight";
            ++totalUnderweight;
        }
        else if (bmi < MINOVER)
        {
            //  BMI >= 18.50 && < 25.00
            status = "Optimal weight";
            ++totalOptimalWeight;
        }
        else if (bmi < MINOBESE)
        {
            //  BMI >= 25.00 && < 30.00
            status = "Overweight";
            ++totalOverweight;
        }
        else
        {
            //  BMI >= 30.00
            status = "Obese";
            ++totalObese;
        }

        return status;
    }

    //  This function will populate the BMI Total modal overlay
    //  with the current accumulator values for each BMI status
    //  type. It will be invisible until the user clicks the
    //  Show Totals button.
    function openOverlay(): void
    {
        //  Write out the current value for each accumulator
        //  into the overlay's <span> elements
        getElement<HTMLSpanElement>('totalUnderweight').textContent =
            String(totalUnderweight);

        getElement<HTMLSpanElement>('totalOptimalWeight').textContent =
        String(totalOptimalWeight);

        getElement<HTMLSpanElement>('totalOverweight').textContent =
        String(totalOverweight);
        
        getElement<HTMLSpanElement>('totalObese').textContent =
        String(totalObese);

        //  Add the visible class to display the overlay
        getElement<HTMLDivElement>('totalsOverlay').classList.add('visible');
    }

    //  This function will close (hide) the BMI Totals Overlay. This
    //  is done by removing the CSS class visible
    function closeOverlay(): void
    {
        getElement<HTMLDivElement>('totalsOverlay').classList.remove('visible');
    }

    //  Event Listeners
    //  Calculate Button
    getElement<HTMLButtonElement>('calculateBtn').addEventListener("click",
        function(): void
        {
            const heightInput: HTMLInputElement = getElement<HTMLInputElement>('height');
            const weightInput: HTMLInputElement = getElement<HTMLInputElement>('weight');

            const height: number = parseInt(heightInput.value, 10);
            const weight: number = parseInt(weightInput.value, 10);

            //  Height validation
            if (isNaN(height) || height < MINHEIGHT || height > MAXHEIGHT) 
            {
                alert(`Please Enter a Height Between ${MINHEIGHT} and ${MAXHEIGHT} Inches`);
                heightInput.value = "";
                heightInput.focus();
                return;
            }

            //  Weight validation
            if (isNaN(weight) || weight < MINWEIGHT || weight > MAXWEIGHT) 
            {
                alert(`Please Enter a Weight Between ${MINWEIGHT} and ${MAXWEIGHT} Pounds`);
                weightInput.value = "";
                weightInput.focus();
                return;
            }

            //  Both the height and the weight are valid.
            //  Calculate the BMI, then calculate the
            //  BMI status
            const bmiString: string = calculateBMI(height, weight);
            const bmiNumber: number = parseFloat(bmiString);

            const bmiStatus: string = calculateBMIStatus(bmiNumber);

            //  Display the calculated BMI in the result area
            getElement<HTMLSpanElement>('bmiValue').textContent = bmiString;

            //  Display the calculated BMI status in the result area
            getElement<HTMLSpanElement>('bmiStatus').textContent = `Category: ${bmiStatus}`;
        }
    );

    //  Clear Form Button
    getElement<HTMLButtonElement>('clearFormBtn').addEventListener("click",
        function(): void
        {
            getElement<HTMLInputElement>('height').value            = "";
            getElement<HTMLInputElement>('weight').value            = "";
            getElement<HTMLInputElement>('bmiValue').textContent    = "";
            getElement<HTMLInputElement>('bmiCategory').textContent = "";            
        }
    );

    //  Show Totals Button
    getElement<HTMLButtonElement>('showTotalsBtn').addEventListener("click",
        function(): void
        {
           openOverlay();          
        }
    );

    //  Close Overlay Button
    getElement<HTMLButtonElement>('closeTotalsBoxBtn').addEventListener("click",
        function(): void
        {
            closeOverlay();
        }
    );