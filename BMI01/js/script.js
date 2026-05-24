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
    let height    = 0;                  //  Inputted height
    let weight    = 0;                  //  Inputted weight
    let bmi       = 0.0;                //  Calculated BMI
    let bmiStatus = "";                 //  BMI status based on the BMI
    let outputStr = "";                 //  String showing all info
    let again     = "";                 //  Run program again question
    let firstChar = "";                 //  First character of again
    let runAgain  = true;               //  True if run program again else false

    let totalUnder = 0;                 //  Total # of underweight people
    let totalOpt   = 0;                 //  Total # of optimal weight people
    let totalOver  = 0;                 //  Total # of overweight people
    let totalObese = 0;                 //  Total # of obese people

    while(runAgain)
    {
        //  Input height
        height = parseInt(prompt("Please Enter A Height Between " + MINHEIGHT + " And " + MAXHEIGHT));

        //  Make a NaN test and a range test
        while(isNaN(height) || (height < MINHEIGHT) || (height > MAXHEIGHT))
        {
            //  "Re-prompt" for height
            height = parseInt(prompt("Invalid Input! Please Enter A Height Between " + MINHEIGHT + 
                                    " And " + MAXHEIGHT));
        }
    
        //  Input weight
        weight = parseInt(prompt("Please Enter A Weight Between " + MINWEIGHT + " And " + MAXWEIGHT));

        //  Make a NaN test and a range test
        while(isNaN(weight) || (weight < MINWEIGHT) || (weight > MAXWEIGHT))
        {
            //  "Re-prompt" for weight
            weight = parseInt(prompt("Invalid Input! Please Enter A Weight Between " + MINWEIGHT + 
                                    " And " + MAXWEIGHT));
        }
    
        //  Calculate BMI based on the formula above
        bmi = (weight / (height * height)) * 703;
        //bmi = (weight / Math.pow(height, 2)) * 703;

        //  Determine BMI status based on the calculated BMI
        if (bmi < MINOPTIMAL)
        {   //  BMI < 18.50
            bmiStatus = "Underweight";
            //  Increment the associated counter
            totalUnder++;
        }
        else if (bmi < MINOVER)
        {   //  BMI < 25.00
            bmiStatus = "Optimal weight";
            //  Increment the associated counter
            totalOpt++;
        }
        else if (bmi < MINOBESE)
        {   //  BMI < 30.00
            bmiStatus = "Overweight";
            //  Increment the associated counter
            totalOver++;
        }
        else
        {   //  BMI > 30.00
            bmiStatus = "Obese";
            //  Increment the associated counter
            totalObese++;
        }

        //  Display individual's results
        outputStr  = `Height: ${height}\n`;
        outputStr += `Weight: ${weight}\n`;
        outputStr += `BMI: ${bmi.toFixed(2)}\n`;
        outputStr += `BMI Status: ${bmiStatus}\n`;
        alert(outputStr);

        //  Ask user to run program again
        again     = prompt("Do You Want To Run The Program Again? (Y/N):", "Y");
        again     = again.toUpperCase();
        firstChar = again.charAt(0);

        if (firstChar !== "Y")
        {
            runAgain = false;
        }
    }

    //  Display final results
    outputStr  = "";
    outputStr  = `Total Underweight People: ${totalUnder}\n`;
    outputStr += `Total Optimal weight People: ${totalOpt}\n`;
    outputStr += `Total Overweight People: ${totalOver}\n`;
    outputStr += `Total Obese People: ${totalObese}\n`;
    alert(outputStr);
