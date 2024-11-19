const questions = [{
  question: "What is the largest animal in the world?",
  answer: [
    { text: "Shark", correct: false },
    { text: "Blue Whale", correct: true },
    { text: "Elephant", correct: false },
    { text: "Giraffe", correct: false }
  ]
},
{
  question: "What is the smallest country in the world?",
  answer: [
    { text: "Vatican City", correct: true },
    { text: "Bhutan", correct: false },
    { text: "Nepal", correct: false },
    { text: "Sri Lanka", correct: false }
  ]
},
{
  question: "What is the Largest desert in the world?",
  answer: [
    { text: "Kalahari", correct: false },
    { text: "Great Victorian", correct: false },
    { text: "Sahara", correct: false },
    { text: "Antarctica", correct: true }
  ]
},
{
  question: "Who is the Greatest football player?",
  answer: [
    { text: "Lionel Messi", correct: true },
    { text: "Diego Maradona", correct: false },
    { text: "Cristiano Ronaldo", correct: false },
    { text: "Pele", correct: false }
  ]
  }
];

const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
currentQuestionIndex = 0;
score = 0;
nextButton.innerHTML = "Next";
showQuestion();
}

function showQuestion() {
resetState();
let currentQuestion = questions[currentQuestionIndex];
let questionNo = currentQuestionIndex + 1;
questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

currentQuestion.answer.forEach(answer => {
  const button = document.createElement("button");
  button.innerHTML = answer.text;
  button.classList.add("btn");
  answerbutton.appendChild(button);

  // Set the correct answer as a dataset attribute
  button.dataset.correct = answer.correct; // Store true/false as string "true"/"false"
  
  // Add event listener to handle answer selection
  button.addEventListener("click", selectAnswer);
});
}

function resetState() {
nextButton.style.display = "none";
while (answerbutton.firstChild) {
  answerbutton.removeChild(answerbutton.firstChild);
  }
}

function selectAnswer(e) {
const selectedBtn = e.target;

// Compare dataset values (always strings) to "true"
const isCorrect = selectedBtn.dataset.correct === "true";

if (isCorrect) {
  selectedBtn.classList.add("Correct");
  score++;
} else {
  selectedBtn.classList.add("Incorrect");
}
Array.from(answerbutton.children).forEach(button=>{
  if(button.dataset.correct==="true"){
    button.classList.add("Correct");
  }
  button.disabled=true;

});
  nextButton.style.display ="block";
}

function showScore(){
  resetState();
  questionElement.innerHTML=`You scored ${score} out of ${questions.length}! `;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}

function  handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex < questions.length) {
    handleNextButton();
    }
  else{
    startQuiz();
  }
})

startQuiz();
