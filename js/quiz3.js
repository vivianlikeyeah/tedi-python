function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    //gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";

    if(quiz.score == 1){

        gameOverHTML += "<h2 id='score'> Correct! Medical Images are most likely to be of the highest <br> veracity! </h2>";

    }
    else{
        gameOverHTML += "<h2 id='score'> Oops! </h2> <h3> Close - not quite. <br> Medical Images are most likely to be of the highest veracity! </h3><h4> Not sure why? Ask your tutor or a classmate! </h4>";

    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Which of the following is likely to be of the highest veracity", ["Medical Images", "Tweets","Health Records", "Genome Data"], "Medical Images")
    ];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();