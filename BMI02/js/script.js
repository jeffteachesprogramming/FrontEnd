/*
    A person's Body Mass Index (BMI) is calculated from their
    weight (in pounds) and height (in inches) using the formula:

        bmi = (weight / (height * height)) * 703

    BMI attempts to quantify total tissue mass (muscle, fat, and
    bone) and classify a person into one of four categories:

        Underweight  :  BMI <  18.50
        Optimal      :  BMI >= 18.50  and  < 25.00
        Overweight   :  BMI >= 25.00  and  < 30.00
        Obese		 :  BMI >= 30.00

    a)  Define constants for min/max height and min/max weight.
    b)  Ask the user after each iteration whether to run the program again.
    c)  Reject blank, NaN, or out-of-range height/weight entries.
    d)  Calculate the BMI to 2 decimal places.
    e)  Determine the BMI status from the calculated value.
    f)  Display height, weight, BMI, and status via a JavaScript alert().
    g)  Maintain counters for each of the four BMI categories.
    h)  Display the category totals in a single alert() when done inputting.
    i)  All logic lives in bmi.js; index.html just loads it.
 */

    //  Constants
    const MINHEIGHT  =  12;             //  Minimum allowable height
    const MAXHEIGHT  =  96;             //  Maximum allowable height
    const MINWEIGHT  =   1;             //  Minimum allowable weight
    const MAXWEIGHT  = 777;             //  Maximum allowable height
    const MINOPTIMAL =  18.50;          //  Minimum BMI for optimal weight
    const MINOVER    =  25.00;          //  Minimum BMI for overweight
    const MINOBESE   =  30.00;          //  Minimum BMI for obese
    //  Out-of-range method for invalid height
    const OORHEIGHT  = "Height Must Be Between " + MINHEIGHT + " And " + MAXHEIGHT + " Inches.";
    //  Out-of-range method for invalid weight
    const OORWEIGHT  = "Weight Must Be Between " + MINWEIGHT + " And " + MAXWEIGHT + " Pounds.";

    //  Variables
    let totalUnder = 0;                 //  Total # of underweight people
    let totalOpt   = 0;                 //  Total # of optimal weight people
    let totalOver  = 0;                 //  Total # of overweight people
    let totalObese = 0;                 //  Total # of obese people

    function main()
    {
        let height    = 0;                  //  Inputted height (12 - 96)
        let weight    = 0;                  //  Inputted weight (1 - 777)
        let bmi       = 0.0;                //  (weight / (height * height)) * 703
        let bmiStatus = "";                 //  Underweight, Optimal weight, etc.
        let runAgain  = true;               //  True if run program again else false
        let again     = "";                 //  Run program again question
        let firstChar = "";                 //  First character of again

        while(runAgain)
        {
            height    = inputHeight();
            weight    = inputWeight();
            bmi       = calculateBMI(height, weight);
            bmiStatus = calculateBMIStatus(bmi);
            displayIndividualStats(height, weight, bmi, bmiStatus);
            runAgain  = anotherTime();
        }

        displayFinalTotals();
    }

    function inputHeight()
    {
        //  Input height
        height = parseInt(prompt("Please Enter A Height Between " + MINHEIGHT + " And " + MAXHEIGHT));

        //  Make a NaN test and a range test
        while(isNaN(height) || (height < MINHEIGHT) || (height > MAXHEIGHT))
        {
            alert(OORHEIGHT);
            //  "Re-prompt" for height
            height = parseInt(prompt("Invalid Input! Please Enter A Height Between " + MINHEIGHT + 
                                    " And " + MAXHEIGHT));
        }

        return height;
    }

    function inputWeight()
    {
        //  Input weight
        weight = parseInt(prompt("Please Enter A Weight Between " + MINWEIGHT + " And " + MAXWEIGHT));

        //  Make a NaN test and a range test
        while(isNaN(weight) || (weight < MINWEIGHT) || (weight > MAXWEIGHT))
        {
            alert(OORWEIGHT);
            //  "Re-prompt" for weight
            weight = parseInt(prompt("Invalid Input! Please Enter A Weight Between " + MINWEIGHT + 
                                    " And " + MAXWEIGHT));
        }

        return weight;
    }

    function calculateBMI(h, w)
    {
        //  Calculate BMI based on the formula above
        //return (w / (h * h)) * 703;
        return (w / Math.pow(h, 2)) * 703;
    }

    function calculateBMIStatus(bmi)
    {
        let s = "";

        //  Determine BMI status based on the calculated BMI
        if (bmi < MINOPTIMAL)
        {   //  BMI < 18.50
            s = "Underweight";
            //  Increment the associated counter
            totalUnder++;
        }
        else if (bmi < MINOVER)
        {   //  BMI < 25.00
            s = "Optimal weight";
            //  Increment the associated counter
            totalOpt++;
        }
        else if (bmi < MINOBESE)
        {   //  BMI < 30.00
            s = "Overweight";
            //  Increment the associated counter
            totalOver++;
        }
        else
        {   //  BMI > 30.00
            s = "Obese";
            //  Increment the associated counter
            totalObese++;
        }

        return s;
    }

    function displayIndividualStats(h, w, bmi, status)
    {
        //  Display individual's results
        let outputStr  = "";
        outputStr  = `Height: ${h}\n`;
        outputStr += `Weight: ${w}\n`;
        outputStr += `BMI: ${bmi.toFixed(2)}\n`;
        outputStr += `BMI Status: ${status}\n`;
        alert(outputStr);
    }

    function anotherTime()
    {
            //  Ask user to run program again
            let again     = prompt("Do You Want To Run The Program Again? (Y/N):", "Y");
                again     = again.toUpperCase();
                firstChar = again.charAt(0);

            if (firstChar !== "Y")
            {
                return false;
            }

            return true;
    }

    function displayFinalTotals()
    {
        //  Display final results
        let outputStr  = "";
        outputStr  = `Total Underweight People: ${totalUnder}\n`;
        outputStr += `Total Optimal weight People: ${totalOpt}\n`;
        outputStr += `Total Overweight People: ${totalOver}\n`;
        outputStr += `Total Obese People: ${totalObese}\n`;
        alert(outputStr);
    }
