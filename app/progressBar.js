
function createDivs(numberOfQuestions) {
    var numberOfDivs = (2*numberOfQuestions) + 1;
    for (divNumber = 1; divNumber <= numberOfDivs; divNumber++) {
        if (divNumber % 2 === 0) {
            var newPoint = document.createElement("point");
            newPoint.className = "progressDivs progressPoint";
            newPoint.id = divNumber.toString();
            document.getElementById("middle").appendChild(newPoint);
        } else {
            var newLine = document.createElement("hr");
            newLine.className = "progressDivs progressLine";
            document.getElementById("middle").appendChild(newLine);
        }   
    } 
}

function createNumberDiv(blockNumber,numberOfQuestions) {
    var newNumberDiv = document.createElement("div");
    newNumberDiv.className = "numberDiv";
    newNumberDiv.id = blockNumberString + "Number";
    questionNumber = blockNumber / 2;
    newNumberDiv.innerHTML += questionNumber.toString() + "/" + numberOfQuestions.toString();
    document.getElementById(blockNumberString).appendChild(newNumberDiv);
}

function removeNumberDiv(blockNumber) {
    document.getElementById(blockNumberString + "Number").remove();
}

//////////////////////temporary js code for advancing and retreating////////////////////////////

/* bockNumber is the question number in the context of the div numbers */
var blockNumber = 2;
var blockNumberString = blockNumber.toString();
document.getElementById(blockNumberString).className += " answeredPoint";

var newNumberDiv = document.createElement("div");
newNumberDiv.className = "numberDiv";
newNumberDiv.id = blockNumberString + "Number";
questionNumber = blockNumber / 2;
newNumberDiv.innerHTML += questionNumber.toString() + "/12";
document.getElementById(blockNumberString).appendChild(newNumberDiv);

function updateBlockUp() {
    blockNumber = blockNumber + 2;
    blockNumberString = blockNumber.toString();
}

function updateBlockDown() {
    blockNumber = blockNumber - 2;
    blockNumberString = blockNumber.toString();
}

function addNextClass() {
    document.getElementById(blockNumberString).className += " answeredPoint";
}

function removeCurrentClass() {
    document.getElementById(blockNumberString).className = document.getElementById(blockNumberString).className.replace 
    ( /(?:^|\s)answeredPoint(?!\S)/g , '' );
}

function incrementUp(numberOfQuestions) {
    var x = 2 * numberOfQuestions;
    if (blockNumber < x) {
        removeCurrentClass();
        removeNumberDiv(blockNumber);
        updateBlockUp();
        addNextClass();
        createNumberDiv(blockNumber,numberOfQuestions);
    }
}

function incrementDown(numberOfQuestions) {
    if (blockNumber > 2) {
        removeCurrentClass();
        removeNumberDiv(blockNumber);
        updateBlockDown();
        addNextClass();
        createNumberDiv(blockNumber,numberOfQuestions);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////




    

