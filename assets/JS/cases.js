/*Get all the cases in one array*/

let cases = document.getElementsByClassName('case');


/*Get the useful elements*/

let winDiv = document.querySelector("#win");
let winCounter = document.querySelector("#winCounter")
let retryButton = document.querySelector("#retry");
let retryContainer = document.querySelector('#retryContainer')


/*Initialize win counter*/

let xWin = 0;
let oWin = 0;


/*Initialize game over and equality detector variable*/

let gameOver = 0;
let hitCount = 0;


/*Initialize 'who have play' detector variable*/

let lastPlayerIsO = 0;
let lastPlayerIsX = 0;

/*Function to draw a X or a O*/

function draw (morpionCase,crossOrCircle) {
    if (gameOver === 0) {
        morpionCase.innerHTML = crossOrCircle;
    }
}


/*Function X and O have win to display win counter and who have win*/

function xHaveWin () {
    if (gameOver === 0) {
        winDiv.innerHTML = "Le joueur X as gagné !!";
        xWin++;
        winCounter.innerHTML = "Le joueur 'X' as gagné " + xWin + " fois et le joueur 'O' as gagné " + oWin + " fois.";
        gameOver = 1;
        winCounter.style.display = "block";
        retryContainer.style.display = "block";
        winDiv.style.display = "block";
    }
}

function oHaveWin () {
    if (gameOver === 0) {
        winDiv.innerHTML = "Le joueur O à gagné !!";
        oWin++;
        winCounter.innerHTML = "Le joueur 'O' as gagné " + oWin + " fois et le joueur 'X' as gagné " + xWin + " fois.";
        gameOver = 1;
        winCounter.style.display = "block";
        retryContainer.style.display = "block";
        winDiv.style.display = "block";
    }
}
/*Function to check if X or O have win*/

function checkWinner () {


    /*Check horizontal*/

    for ( let i = 0 ; i < 3 ; i++ ) {
            if (cases[i*3].innerHTML === "X" && cases[1 + i*3].innerHTML === "X" && cases[2 + i*3].innerHTML === "X") {
                xHaveWin();
            }
            else if (cases[i*3].innerHTML === "O" && cases[1 + i*3].innerHTML === "O" && cases[2 + i*3].innerHTML === "O") {
                oHaveWin();
            }
        }


    /*Check vertical*/

    for ( let i = 0 ; i < 3 ; i++ ) {
        if (cases[i].innerHTML === "X" && cases[3 + i].innerHTML === "X" && cases[6 + i].innerHTML === "X") {
            xHaveWin();
        }
        else if (cases[i].innerHTML === "O" && cases[3 + i].innerHTML === "O" && cases[6 + i].innerHTML === "O") {
            oHaveWin();
        }
    }


    /*Check diagonal*/

    for ( let i = 0 ; i < 2 ; i++ ) {
        if (cases[i*2].innerHTML === "X" && cases[4].innerHTML === "X" && cases[8 - i*2].innerHTML === "X") {
            xHaveWin();
        }
        else if (cases[i*2].innerHTML === "O" && cases[4].innerHTML === "O" && cases[8 - i*2].innerHTML === "O") {
            oHaveWin();
        }
    }
}


/* Function to detect and display for equality*/

function equality () {
    if (hitCount === 9 && gameOver === 0) {
        winDiv.innerHTML = "C'est une égalité";
        gameOver = 1;
        winDiv.style.display = "block";
        retryContainer.style.display = "block";
    }
}

/*Function to disable the context menu*/

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});


/* Function to make the computer playing instead of the X player*/

function computer () {
    let caseToPlay = Math.floor(Math.random()*8)
    if (cases[caseToPlay].innerHTML === "" && gameOver === 0){
        cases[caseToPlay].innerHTML = "X"
        lastPlayerIsO = 0;
        lastPlayerIsX = 1;
    }
    else if (cases[caseToPlay].innerHTML !== "" && gameOver === 0) {
        computer();
    }
}


/* add an event listener to the retry button to make it star again the game*/

retryButton.addEventListener('click', function (){
    gameOver = 0;
    lastPlayerIsX = 0;
    lastPlayerIsO = 0;
    winDiv.innerHTML = "";
    retryContainer.style.display = "none";
    winDiv.style.display = "none";
    hitCount = 0;
    for (let i = 0 ; i < cases.length ; i++ ) {
        cases[i].innerHTML = ""
    }
})


/*For loop to add even listener with to all the cases */

for (let i = 0 ; i < cases.length ; i++ ) {
    cases[i].addEventListener("contextmenu", function () {
        if (lastPlayerIsX === 0 && cases[i].innerHTML === "") {
            draw(cases[i], "X");
            checkWinner();
            lastPlayerIsX = 1;
            lastPlayerIsO = 0;
            hitCount++;
            equality();
        }
    });
    cases[i].addEventListener("click", function (){
        if (lastPlayerIsO === 0 && cases[i].innerHTML === "") {
            draw(cases[i], "O");
            checkWinner();
            lastPlayerIsO = 1;
            lastPlayerIsX = 0;
            hitCount++;
            equality();
            let choice = document.getElementById("playerOrPC")
            if ( choice.selectedIndex === 1) {
                computer();
            }
        }
    });
}