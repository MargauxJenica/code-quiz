//------------------------------------------------------------------------------//
//   grabbing HTML elements and attributes and assigns them to variables        //           
//------------------------------------------------------------------------------//

var startPage = document.querySelector(".startPage");
var startBtn = document.getElementById("start-Btn");
var scoreBoardBtn = document.getElementById("scoreBoard-Btn");
var quizWindow = document.getElementById("quiz-Window");
var topScoreBoard = document.querySelector(".topScoreBoard");
var exitScoreBoardBtn = document.getElementById("exitScoreBoard-Btn");
var clearScoreBoardBtn = document.getElementById("clearScoreBoard-Btn");
var verifyUserChoice = document.getElementById("verifyUserChoice");
var currentQuestion = document.getElementById("currentQuestion");
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

var userChoice;
var correctAnswer; 
var time = 60;
var scoreCount = 0;
var quizIndex = 0;
var quizQuestions = [
    {
        question: "Inside which HTML element do we link the JavaScript?",
        multipleChoice: ["<link>", "<javascript>", "<script>", "<a>"],
        answer: "<script>"
    },
    {
        question: "How do you create a function in JavaScript?",
        multipleChoice: ["function = myFunction()", "function myFunction[]", "function == myFunction[]","function myFunction()"],
        answer: "function myFunction()"
    },
    {
        question: "How does a FOR loop start?",
        multipleChoice: ["for (i = 0; i < 4; i++)", "for (i = 0, i < 4, i++)", "for()", "for (i = 0, i < 4)"],
        answer: "for (i = 0; i < 4; i++)"
    },
    {
        question: "How can you make a numbered list?",
        multipleChoice: ["<ul>", "<ol>", "<li>", "<nl>"],
        answer: "<ol>"
    },
    {
        question: "How do you comment in CSS ?",
        multipleChoice: ["<!-- -->", "//", "/* */", "<--- --->"],
        answer: "/* */"
    },
    {
        question: "How do you select an element with id 'demo'?",
        multipleChoice: ["demo", ".demo", "*demo", "#demo"],
        answer: "#demo"
    },
];
//------------------------------------------------------------------------------//
//                                 Functions                                    //
//------------------------------------------------------------------------------//

function homePage () { // display only the home page

    startPage.style.display = "block";

    quizWindow.style.display = "none";

    quizResultsWindow.style.display = "none";

    topScoreBoard.style.display = "none";

    console.log('in homePage function');

}

function startTimer() { // TIMER 

    var timerInterval = setInterval(function () {

        if (time <= 0) {

            clearInterval(timerInterval);
            resultsWindow();

        } else { // Decrement time only if it's greater than 0

            time--; 
            
            timerCount.textContent = time;
        }

    }, 1000);
}

function displayQuiz() { // QUIZ WINDOW

    // displaying the quiz and hiding the start page
    if (quizWindow.style.display === "none") {

        quizWindow.style.display = "block";

        startPage.style.display = "none";

    }

    // testing if we are at the end of the question[]
    if (quizIndex < quizQuestions.length) {

       // change the value of currentQuestion to display the proper question  
        currentQuestion.textContent = quizQuestions[quizIndex].question;

        console.log(currentQuestion);

        // set correctAnswer
        correctAnswer = quizQuestions[quizIndex].answer;

        console.log("The correct answer is " + correctAnswer);

        choiceList.innerHTML = ''; // clear exisiting multiple choice options

        for (var i = 0; i < quizQuestions[quizIndex].multipleChoice.length; i++) {

            var choicesLi = document.createElement("li");

            var options = document.createElement("button");

            options.textContent = quizQuestions[quizIndex].multipleChoice[i];

            choicesLi.appendChild(options);
            choiceList.appendChild(choicesLi);
        };

        quizIndex++;

    } else {

        resultsWindow(); // All questions have been displayed

        console.log('All questions displayed');
    }
}

function handleButtonClick (event) {

    if (userChoice.matches("button")) { // FIX THIS BUTTON

        event.preventDefault;
        userChoice = event.target.textContent; // store the user's choice from the clicked button
    
        console.log("User chose: " + userChoice);
        console.log ("Correct Answer: " + correctAnswer);
    
        verifyAnswer(userChoice, correctAnswer);

    }



}

function verifyAnswer(userChose, questionAnswer) { // VALIDATING USER ANSWER

    if (userChoice === correctAnswer) {
        console.log("Correct!");

        scoreCount++;

        currentScore.textContent = scoreCount;
        console.log("The score is " + scoreCount);

        displayQuiz(); // call to display next question
      
    } else {
        console.log("Incorrect!");
        
        verifyUserChoice.textContent = "Incorrect";

        time = Math.max(0, time - 10); // subtract 10 seconds from the timer
        console.log("Time subtracted. Current time: " + time);

        setTimeout(function () {

            verifyUserChoice.textContent = ""; // clear the "Incorrect" message

            displayQuiz();

        }, 500);
        
    };
   
}

function resultsWindow() { // USER SAVING THEIR TEST RESULTS

    if (quizWindow.style.display === "block") {

        quizWindow.style.display = "none";

        quizResultsWindow.style.display = "block";

    }

    userScore.textContent = scoreCount;
}

function handleInitialsSubmit() {
    var userInitials = userInitialsInput.value.trim();

    if (userInitials !== "") {
        // create an object to store user data
        var userData = {
            initials: userInitials,
            score: scoreCount
        };

        // retrieve existing scores from localStorage
        var existingScores = JSON.parse(localStorage.getItem("scores")) || [];

        // add the new user data to the array
        existingScores.push(userData);

        // save the updated scores array to localStorage
        localStorage.setItem("scores", JSON.stringify(existingScores));

        displayScoreBoard();

    } else {
        alert("Please enter valid initials (i.e., ABC)");
    };
}

function displayScoreBoard() {
    
    if (topScoreBoard.style.display === "none" || startPage.style.display === "block") {
        
        quizResultsWindow.style.display = "none";
        
        startPage.style.display = "none";

        topScoreBoard.style.display = "block";
    }
    
    // Retrieve scores from local storage
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    
    // Sort scores in descending order
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    
    // Display the top 5 scores
    var topScoresList = document.getElementById("topScores");
    topScoresList.innerHTML = ''; // Clear existing scores
    
    for (var i = 0; i < Math.min(5, scores.length); i++) {
        var scoreLi = document.createElement("li");
        scoreLi.textContent = scores[i].initials + ":   " + scores[i].score;
        topScoresList.appendChild(scoreLi);
    }
    
    console.log("in displayScoreBoard function");
    
    resetQuiz();
}

function resetQuiz() {

    // reset variables to their initial values
    scoreCount = 0;
    quizIndex = 0;
    time = 60;

    // reset currentScore elements
    currentScore.textContent = scoreCount;
    
    // clear user input field for initials
    userInitialsInput.value = "";
}

function clearScores() {
    
    localStorage.removeItem("scores");
    
    // Optionally, you can clear the displayed scores in your UI if needed.
    var topScoresList = document.getElementById("topScores");
    
    topScoresList.innerHTML = '';
    
}
//------------------------------------------------------------------------------//
//                                  Start                                       //
//------------------------------------------------------------------------------//

// start up the homepage
homePage();


startBtn.addEventListener("click", function () {
    startTimer();
    displayQuiz();
});

scoreBoardBtn.addEventListener("click", displayScoreBoard);

exitScoreBoardBtn.addEventListener("click", homePage);

clearScoreBoardBtn.addEventListener("click", clearScores);

choiceList.addEventListener("click", handleButtonClick);

submitInitialsBtn.addEventListener("click", handleInitialsSubmit);