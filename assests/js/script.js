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
var userInitialsInput = document.getElementById("userInitials");
var submitInitialsBtn = document.getElementById("submitInitials-Btn");
//------------------------------------------------------------------------------//
//                         Variables and Arrays                                 //
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

function startTimer() { // TIMER 

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
        };
    }

    timerInterval = setInterval(updateTimer, 1000);

};

function displayQuiz() { // QUIZ WINDOW

    showQuizWindow();

    // testing if we are at the end of the question[]
    if (questionIndex < quizQuestions.length){

        var currentQuestion = quizQuestions[questionIndex];

        question.textContent = currentQuestion.question;
    
        // passing the questionIndex to keep answerIndex the same
        displayChoices(currentQuestion.choices, questionIndex);

        questionIndex++;
    } 
    else {

        resultsWindow(); // All questions have been displayed

        console.log('All questions displayed');
    };
};

function displayChoices(choices, answerIndex) { // QUIZ CHOICES

    choiceList.innerHTML = ''; // Clear existing choices

    var ul = document.createElement("ul");

    // Create and append list items for each choice
    for (var i = 0; i < choices.length; i++) {

        var li = document.createElement("li");

        var button = document.createElement("button");
        
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
    
    choiceList.appendChild(ul);
};

function verifyAnswer(userChoice, correctAnswer) { // VALIDATING USER ANSWER

    if (userChoice === correctAnswer) {
        console.log("Correct!");

        scoreCount++;

        currentScore.textContent = scoreCount;
        console.log("The score is " + scoreCount);
        
    } else {
        console.log("Incorrect!");
        

        time = Math.max(0, time - 10); // Subtract 10 seconds from the timer
        console.log("Time subtracted. Current time: " + time);
        
    };
   
    
    displayQuiz(); // call to display next question
};

function resultsWindow() { // USER SAVING THEIR TEST RESULTS

    showResults();

    userScore.textContent = scoreCount;

    submitInitialsBtn.addEventListener("click", function() {

        var userInitials = userInitialsInput.value.trim();

        if (userInitials !== "") {

            localStorage.setItem("userInitials", userInitials);

            localStorage.setItem("userScore", scoreCount);

            displayScoreBoard();

        }else{

            alert("Please enter valid initials (i.e. ABC)");

        };
    
    localStorage.setItem("userScore", scoreCount);
});

};
function displayScoreBoard() {

    showScoreBoard();

    exitScoreBoardBtn.addEventListener("click", homePage);
    clearScoreBoardBtn.addEventListener("click", clearScores);

    var storedInitials = localStorage.getItem("userInitials");
    var storedScores = parseInt(localStorage.getItem("userScore"), 10);

    var li = document.createElement("li");
    li.textContent = storedInitials + ":   " + storedScores;
    topScores.appendChild(li);

    console.log("in displayScoreBoard function");
};

function clearScores() {

};
function showQuizWindow(event) {

    event.preventDefault();
    
    if (quizWindow.style.display === "none"){

        startPage.style.display = "none";

        quizResultsWindow.style.display = "none";

        topScoreBoard.style.display = "none";

        quizWindow.style.display = "block";

        console.log('in showQuizWindow function');

    };
};

function showResults(event) {

    event.preventDefault();

    if (quizResultsWindow.style.display === "none"){

        startPage.style.display = "none";

        quizWindow.style.display = "none";

        topScoreBoard.style.display = "none";

        quizResultsWindow.style.display = "block";
        
        console.log('in showResults function');
    };

};

function showScoreBoard(event) {

    

    if (topScoreBoard.style.display === "none"){

        startPage.style.display = "none";

        quizWindow.style.display = "none";

        quizResultsWindow.style.display = "none";

        topScoreBoard.style.display = "block";
        
        console.log('in showScoreBoard function');
    };

};

function homePage(){

    startPage.style.display = "block";

    quizWindow.style.display = "none";

    quizResultsWindow.style.display = "none";

    topScoreBoard.style.display = "none";

    console.log('in homePage function');

};

//------------------------------------------------------------------------------//
//                                  Start                                       //
//------------------------------------------------------------------------------//

homePage();

startBtn.addEventListener("click", function(){
    startTimer();
    displayQuiz();
});

scoreBoardBtn.addEventListener("click", displayScoreBoard);