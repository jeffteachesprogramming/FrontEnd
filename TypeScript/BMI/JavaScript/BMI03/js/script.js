//let underweight        = 0;
//let optimalWeight      = 0;
//let overweight         = 0;
//let obese              = 0;
let totalUnderweight   = 0;
let totalOptimalweight = 0;
let totalOverweight    = 0;
let totalObese         = 0;
let height             = 0;
let weight             = 0;

//  Code that executes when the calculate button is clicked
document.getElementById('calculateBtn').addEventListener('click', function()
{
    const MINHEIGHT =  12;  //  Minimum allowed height
    const MAXHEIGHT =  96;  //  Maximum allowed height
    const MINWEIGHT =   1;  //  Minimum allowed weight
    const MAXWEIGHT = 777;  //  Maximum allowed weight

    //  Retrieve the height and weight values entered
    //  into the associated input elements.
    height = parseInt(document.getElementById('height').value);
    weight = parseInt(document.getElementById('weight').value);

    //  height empty and range checks
    if ((!height)              ||
        (height < MINHEIGHT)   ||
        (height > MAXHEIGHT))
    {
        alert("Please Enter A Valid Height Between " + MINHEIGHT + " And " + MAXHEIGHT);
        document.getElementById('height').value = "";
        document.getElementById('height').focus();
        return;
    }
        //  weight empty and range checks
    if ((!weight)              ||
        (weight < MINWEIGHT)   ||
        (weight > MAXWEIGHT))
    {
        alert("Please Enter A Valid Weight Between " + MINWEIGHT + " And " + MAXWEIGHT);
        document.getElementById('weight').value = "";
        document.getElementById('weight').focus();
        return;
    }
    
    //  If we make it this far, a valid height and
    //  a valid weight were input. So, calculate
    //  the BMI and then the BMI status.
    const bmi = calculateBMI(height, weight);

    const bmiStatus = calculateBMIStatus(bmi);

    //  Add the calculated BMI to the overlay
    document.getElementById('bmiValue').textContent = bmi;

    //  Add the calculated BMI status to the overlay
    document.getElementById('bmiCategory').textContent = bmiStatus;
});

//  Return the height and weight based on the imperial BMI forumula
function calculateBMI(h, w)
{
    return (weight / (height * height) * 703).toFixed(2);
}

function calculateBMIStatus(bmi)
{
    const MINOPTIMAL = 18.50;   //  18.50 is the smallest optimal weight BMI allowed
    const MINOVER    = 25.00;   //  25.00 is the smallest overweight BMI allowed
    const MINOBESE   = 30.00;   //  30.00 is the smallest obese BMI allowed

    let status = "";

    if (bmi < MINOPTIMAL)
    {   //  bmi < 18.50
        status = "Underweight";
        ++totalUnderweight;
    }
    else if (bmi < MINOVER)
    {   //  bmi < 25.00
        status = "Optimal weight";
        ++totalOptimalweight;
    }
    else if (bmi < MINOBESE)
    {   //  bmi < 30.00
        status = "Overweight";
        ++totalOverweight;
    }
    else
    {   //  bmi >= 30.00
        status = "Obese";
        ++totalObese;
    }

    return status;
}

//  Code that executes when the clear form button is clicked
document.getElementById('clearFormBtn').addEventListener('click', function()
{
    document.getElementById('height').value            = "";
    document.getElementById('weight').value            = "";
    document.getElementById('bmiValue').textContent    = "0";
    document.getElementById('bmiCategory').textContent = 'Category: ';
});

//  Code that executes when the show totals button is clicked
document.getElementById('showTotalsBtn').addEventListener('click', function()
{
    openOverlay();
});

//  Fill in the overlay accumulators with the accumulator values
function openOverlay()
{
    document.getElementById('totalUnderweight').textContent   = totalUnderweight;
    document.getElementById('totalOptimalWeight').textContent = totalOptimalweight;
    document.getElementById('totalOverweight').textContent    = totalOverweight;
    document.getElementById('totalObese').textContent         = totalObese;

    //  Make the overlay visible
    document.getElementById('totalsOverlay').classList.add('visible');
}

//  Code that executes when the overlay close button is clicked
document.getElementById('closeTotalsBoxBtn').addEventListener('click', function(e)
{
    closeOverlay();
});

function closeOverlay()
{
    //  Make the overlay invisible
    document.getElementById('totalsOverlay').classList.remove('visible');
}