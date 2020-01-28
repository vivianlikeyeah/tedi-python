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
    var gameOverHTML = "<h1>Have you considered the following?</h1> <p> <u>Government</u> - "+ 
   "What happens if a changing political parties/changing standards of what is acceptable? "
    + "<br><u>Private company</u> - What if they sell your information? "
    + "All of a sudden your menstural tracking app is telling your health insurer that you may be expecting a child before you even realise. "
    + "<br><u>Individual</u> - The leading argument as to the ownership of DNA not belonging to an individual is as follows - "
    + "Without the technology and techniques provided by private companies/government, you would not even know your own genetic information. " 
    + "If you couldn't obtain it yourself, can you really own it? Should you own it? What if your genetic information is the key to saving millions of lives, " 
    + "but you're not letting the researcher who discovered it use this information.</p>";
    //gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";


    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Considering case 3; who do you think should own your genetic information?", ["Government", "You", "Researchers","Private Companies"], "Your London Vacation Vlogs")
    ];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();