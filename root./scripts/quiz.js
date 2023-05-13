

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


// push the questions into availableQuestions Array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i]);
    }
}

// set question number and question and options
function getNewQuestion() {
    // set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // set question text & get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    // get the position of questionIndex from the availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);

    // remove the questionIndex  from the availableQuestion Array, so that the question doesn't repeat
    availableQuestions.splice(index1, 1);

    // set options
    // get the length of options
    const optionLen = currentQuestion.options.length;
    // push options into availableOptions Array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.2;

    // create options in html
    for (let i = 0; i < optionLen; i++) {
        // random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++;
}

// get result of current attempt on question
function getResult(element) {
    const id = parseInt(element.id);
    // get the answer by comparing id of clicked option
    if (id === currentQuestion.answer) {
        // set correct answer color to green
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;

        console.log("Correct Answers: " + correctAnswers);
    }
    else {
        // set incorrect answer color to red
        element.classList.add("incorrect");
        updateAnswerIndicator("incorrect");

        // show the correct answer when user selects a wrong one
        const optionLen = optionContainer.children.length;
        for (i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

// restrict user from selecting another option once they've alredy selected one
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered")
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = ''
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

function next() {
    if (questionCounter === quiz.length) {
        console.log("Quiz over");
        quizOver();
    }
    else {
        getNewQuestion();
    }
}

function quizOver() {
    // hide quiz box
    quizBox.classList.add("hide");

    // show result box
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;

    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz() {
    // hide result box
    resultBox.classList.add("hide");

    // show quiz box
    quizBox.classList.remove("hide");

    resetQuiz();
    startQuiz();
}

function startQuiz(){
    // hide result box
    resultBox.classList.add("hide");

    // show quiz box
    quizBox.classList.remove("hide");
    
    // call getNewQuestions()
    getNewQuestion();

    // create indicators of answers
    answersIndicator();
}

window.onload = function () {
    // set all questions in availableQuestions array
    setAvailableQuestions();

    // call getNewQuestions()
    getNewQuestion();

    // create indicators of answers
    answersIndicator();
}