let leftTopCase = document.getElementById("leftTop");
let middleTopCase = document.getElementById("middleTop");
let rightTopCase = document.getElementById("rightTop");
let leftMiddleCase = document.getElementById("leftMiddle");
let middleMiddleCase = document.getElementById("middleMiddle");
let rightMiddleCase = document.getElementById("rightMiddle");
let leftBottomCase = document.getElementById("leftBottom");
let middleBottomCase = document.getElementById("middleBottom");
let rightBottomCase = document.getElementById("rightBottom");

let morpion = document.getElementsByClassName('case');

function draw (morpionCase,crossOrCircle) {
    morpionCase.innerHTML = crossOrCircle;
}

for ( let i = 0 ; i < morpion.length ; i++ ) {
    morpion[i].addEventListener("contextmenu", function (){
        draw (morpion[i],"X");
        checkWinner();
    });
    morpion[i].addEventListener("click", function (){
        draw (morpion[i],"O");
        checkWinner();
    });
}


function checkWinner () {
    if (leftTopCase.innerHTML === "O" && middleTopCase.innerHTML === "O" && rightTopCase.innerHTML === "O" ) {
        alert("test")
    }
}
