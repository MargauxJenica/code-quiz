//------------------------------------------------------------------------------//
//   grabbing HTML elements and attributes and assigns them to variables        //           
//------------------------------------------------------------------------------//
var startPage = document.querySelector(".startPage");
var startBtn = document.getElementById("start-Btn");
var scoreBoardBtn = document.getElementById("scoreBoard-Btn");
var quizWindow = document.querySelector(".quiz-Window");
var countdown = document.getElementById("timeCount");
var topScoreBoard = document.querySelector(".topScoreBoard");
var exitScoreBoardBtn = document.getElementById("exitScoreBoard-Btn");
var clearScoreBoardBtn = document.getElementById("clearScoreBoard-Btn");
var verifyUserChoice = document.getElementById("verifyUserChoice");
var question = document.getElementById("question");
var choiceList = document.getElementById("choiceList");
var userScore = document.getElementById("userScore");
var timerCount = document.getElementById("timerCount");
var currentScore = document.getElementById("currentScore");
var quizResultsWindow = document.querySelector(".quizResults-Window");
//------------------------------------------------------------------------------//
//                                Variables                                     //
//------------------------------------------------------------------------------//
var scoreCount = 0;
var time = 60;
var questionIndex = 0;
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
];
//------------------------------------------------------------------------------//
//                                 Functions                                    //
//------------------------------------------------------------------------------//

function startTimer(){ // Timer 

    var timerInterval;

    clearInterval(timerInterval); // Clear existing interval

    updateTimer(); // Update immediately

    function updateTimer() {
        timerCount.textContent = time;

        if (time <= 0) {
            clearInterval(timerInterval);
            resultsWindow();
        } else {
            time--; // Decrement time only if it's greater than 0
        }
    }

    timerInterval = setInterval(updateTimer, 1000);

};

function displayQuiz(){
    startPage.style.display = "none";
    quizWindow.style.display = "block";

    // testing if we are at the end of the question[]
    if (questionIndex < quizQuestions.length){

        // initializing the current question
        var currentQuestion = quizQuestions[questionIndex];

        // updating the text content of an HTML element with the ID "question" 
        // to display the current question in your quiz.
        question.textContent = currentQuestion.question;
    
        // passing the questionIndex to keep answerIndex the same
        displayChoices(currentQuestion.choices, questionIndex);

        questionIndex++;
    } 
    else {
        // All questions have been displayed, handle accordingly
        resultsWindow();
        console.log('All questions displayed');
    }
    
    console.log(currentQuestion);

};

function displayChoices(choices, answerIndex) {
    // Clear existing choices
    choiceList.innerHTML = '';

    // Create an unordered list
    var ul = document.createElement("ul");

     // Add styling to remove bullet points
     ul.style.listStyleType = "none";

    // Create and append list items for each choice
    for (var i = 0; i < choices.length; i++) {
        var li = document.createElement("li");
        var button = document.createElement("button");
        
        // changing the content of button to respective choice options
        button.textContent = choices[i];

        // storing userChoice when they pick their answer
        button.addEventListener("click", function (event) {
            event.preventDefault();
            var userChoice = this.textContent;
            
            var correctAnswer = quizQuestions[answerIndex].answer;
         
            
            console.log("The correct answer " + correctAnswer);
            console.log("user chose " + userChoice);
            verifyAnswer(userChoice, correctAnswer); 
        });
    

        li.appendChild(button);
        ul.appendChild(li);
    };
    // Append unordered list 
    choiceList.appendChild(ul);
};

function verifyAnswer(userChoice, correctAnswer){

    if (userChoice === correctAnswer) {
        console.log("Correct!");

        scoreCount++;

        currentScore.textContent = scoreCount;
        console.log("The score is " + userScore);
        
    } else {
        console.log("Incorrect!");
        // Subtract 10 seconds from the timer
        time = Math.max(0, time - 10);
        console.log("Time subtracted. Current time: " + time);
        
    }

    displayQuiz();
};

function resultsWindow(){
    quizWindow.style.display = "none";
    quizResultsWindow.style.display = "block";
    userScore.textContent = scoreCount;
};
function displayScoreBoard(){
    startPage.style.display = "none";
    topScoreBoard.style.display = "block";

    exitScoreBoardBtn.addEventListener("click", returnHome);
    clearScoreBoardBtn.addEventListener("click", clearScores);

    console.log("in displayScoreBoard function");
};

function returnHome(){
    topScoreBoard.style.display = "none";
    startPage.style.display = "block";

     startBtn.addEventListener("click", displayQuiz);
     scoreBoard.addEventListener("click", displayScoreBoard);

    console.log('in returnHome function');
};
function clearScores(){

};

startBtn.addEventListener("click", function(){
    startTimer();
    displayQuiz();
});
scoreBoardBtn.addEventListener("click", displayScoreBoard);