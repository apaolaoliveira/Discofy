const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What year did women develop an interest in sportswear?",
    answers: [
      { text: "1950", correct: true },
      { text: "1920", correct: false },
    ],
  },
  {
    question: "In which two decades was the hippie style most common?",
    answers: [
      { text: "1960", correct: true },
      { text: "1970", correct: true },
      { text: "1980", correct: false },
      { text: "2000", correct: false },
    ],
  },
  {
    question: "What clothing was most popular among men in the 1980's?",
    answers: [
      { text: "Suit jacket with casual shirts", correct: true },
      { text: "Pajamas", correct: false },
      { text: "Tuxedo", correct: false },
      { text: "Flannels and jeans", correct: false },
    ],
  },
  {
    question: "What year was fast fashion the most prominent and why?",
    answers: [
      { text: "1890, people learned through trends", correct: false },
      { text: "1910, because of magazine promotions", correct: false },
      { text: "2000, due to tech and the internet", correct: true },
      { text: "1840, no specific reason", correct: false },
    ],
  },
  {
    question: "What clothing materials grew popular in the 1940s?",
    answers: [
      { text: "Nylon, cotton, and rayon", correct: true },
      { text: "Silk and cotton", correct: false },
      { text: "Polyester, cotton, and rayon", correct: false },
      { text: "Silk and rayon", correct: false },
    ],
  },
];
