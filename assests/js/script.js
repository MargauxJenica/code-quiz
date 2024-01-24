//
var startPage = document.querySelector(".startPage");
var startBtn = document.querySelector("#startBtn");
var scoreBoard = document.querySelector("#scoreBoard");
var quizWindow = document.querySelector(".quizWindow");
var countdown = document.querySelector("#timeCount");
var topScoreBoard = document.querySelector(".topScoreBoard");
var exitScoreBoard = document.querySelector("#exitScoreBoard");
var clearScoreBoard = document.querySelector("#clearScoreBoard");
var verifyUserChoice = document.querySelector("#verifyUserChoice");


var time = 60;
var quizQuestions = [
    {
        question: "Inside which HTML element do we link the JavaScript?",
        choices: ["<link>", "<javascript>", "<script>", "<a>"],
        answer: "<script>"
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function myFunction[]", "function == myFunction[]","function myFunction()"],
        answer: "function myFunction()"
    },
    {
        question: "How does a FOR loop start?",
        choices: ["for (i = 0; i < 4; i++)", "for (i = 0, i < 4, i++)", "for()", "for (i = 0, i < 4)"],
        answer: "for (i = 0; i < 4; i++)"
    },
    {
        question: "How can you make a numbered list?",
        choices: ["<ul>", "<ol>", "<li>", "<nl>"],
        answer: "<ol>"
    },
    {
        question: "How do you comment in CSS ?",
        choices: ["<!-- -->", "//", "/* */", "<--- --->"],
        answer: "/* */"
    },
    {
        question: "How do you select an element with id 'demo'?",
        choices: ["demo", ".demo", "*demo", "#demo"],
        answer: "#demo"
    },
]

function displayQuiz(){
    startPage.style.display = "none";
    quizWindow.style.display = "block";

    startTimer();
    console.log('in displayQuiz function');
};

function displayScoreBoard(){
    startPage.style.display = "none";
    topScoreBoard.style.display = "block";

    exitScoreBoard.addEventListener("click", returnHome);
    clearScoreBoard.addEventListener("click", clearScores);

    console.log("in displayScoreBoard function");
};

function returnHome(){
    topScoreBoard.style.display = "none";
    startPage.style.display = "block";

    //startBtn.addEventListener("click", displayQuiz);
   // scoreBoard.addEventListener("click", displayScoreBoard);

    console.log('in returnHome function');
};
function clearScores(){
    
}

function verifyAnswer(){

} 

function startTimer(){

};

startBtn.addEventListener("click", displayQuiz);
scoreBoard.addEventListener("click", displayScoreBoard);