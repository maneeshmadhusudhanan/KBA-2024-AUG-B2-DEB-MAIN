const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
        correctAnswer: "C"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["A) Earth", "B) Mars", "C) Jupiter", "D) Venus"],
        correctAnswer: "B"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["A) Atlantic Ocean", "B) Indian Ocean", "C) Arctic Ocean", "D) Pacific Ocean"],
        correctAnswer: "D"
    },
];

let currentQuestionIndex = 0;
let score = 0;
const timeLimit = 10; // seconds

function startQuiz() {
    console.log("Welcome to the Quiz!");
    askQuestion();
}

function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        console.log(`\nQuestion ${currentQuestionIndex + 1}: ${currentQuestion.question}`);
        currentQuestion.answers.forEach(answer => console.log(answer));

        const timer = setTimeout(() => {
            console.log("\nTime's up! Moving to the next question.");
            currentQuestionIndex++;
            askQuestion();
        }, timeLimit * 1000);

        rl.question("Your answer (A/B/C/D): ", (userAnswer) => {
            clearTimeout(timer); // Clear the timer if the user answers in time
            if (userAnswer.toUpperCase() === currentQuestion.correctAnswer) {
                console.log("Correct!");
                score++;
            } else {
                console.log(`Wrong! The correct answer was ${currentQuestion.correctAnswer}.`);
            }
            currentQuestionIndex++;
            askQuestion();
        });
    } else {
        displayScore();
    }
}

function displayScore() {
    console.log(`\nQuiz completed! Your score: ${score} out of ${questions.length}`);
    rl.close();
}

startQuiz();