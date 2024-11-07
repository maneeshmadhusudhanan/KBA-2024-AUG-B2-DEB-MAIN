const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Predefined array of quiz questions
const questions = [
  {
    question: "Where is TECHNOPARK located in KERALA ?",
    options: ["ERNAKULAM", "KANNUR", "THIRUVANANTHAPURAM", "KOLLAM"],
    answer: 2, // index of the correct answer
  },
  {
    question: "Where is INFOPARK located in KERALA",
    options: ["KOCHI", "THIRUVANANTHAPURAM", "KOLLAM", "KANNUR"],
    answer: 0,
  },
  {
    question: "Where is UST GLOBAL located in KERALA ",
    options: ["KOCHI", "THIRUVANANTHAPURAM", "KOLLAM", "KOZHIKODE"],
    answer: 1,
  },
  {
    question: "What is IIITMK located in KERALA",
    options: ["MALAPURAM", "THIRUVANANTHAPURAM", "KOLLAM", "KANNUR"],
    answer: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;
const timeLimit = 10; // seconds for each question
let timer;

function startQuiz() {
  console.log("WELCOME TO THE QUIZ!");
  askQuestion(currentQuestionIndex);
}

function askQuestion(index) {
  const question = questions[index];
  console.log(`\nQuestion ${index + 1}: ${question.question}`);
  question.options.forEach((option, i) => {
    console.log(`${i + 1}. ${option}`);
  });

  // Start the timer
  startTimer();

  rl.question("Enter your answer (1-4): ", function (input) {
    clearTimeout(timer);
    const answer = parseInt(input.trim()) - 1;

    if (answer === question.answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log(`Wrong! The correct answer was: ${question.options[question.answer]}`);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      askQuestion(currentQuestionIndex);
    } else {
      displayScore();
    }
  });
}

function startTimer() {
  let timeRemaining = timeLimit;
  console.log(`You have ${timeRemaining} seconds to answer...`);

  timer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      console.log("\nTime's up!");
      console.log(`The correct answer was: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer]}`);
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        askQuestion(currentQuestionIndex);
      } else {
        displayScore();
      }
    }
  }, 1000);
}

function displayScore() {
  console.log(`\nQuiz Over! Your score is: ${score} out of ${questions.length}`);
  rl.close();
}

// Start the quiz
startQuiz();