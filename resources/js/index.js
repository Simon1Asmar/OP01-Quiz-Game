const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    options: ["Berlin", "Madrid", "Paris", "Budapest"],
    answer: "Berlin",
  },
  {
    question: "What is the capital of Spain?",
    options: ["Lisbon", "Madrid", "Paris", "Rome"],
    answer: "Madrid",
  },
  {
    question: "What is the capital of Italy?",
    options: ["Venice", "Madrid", "Milan", "Rome"],
    answer: "Rome",
  },
  {
    question: "What is the capital of Portugal?",
    options: ["Lisbon", "Porto", "Seville", "Barcelona"],
    answer: "Lisbon",
  },
  {
    question: "What is the capital of Hungary?",
    options: ["Vienna", "Madrid", "Budapest", "Rome"],
    answer: "Budapest",
  },
  {
    question: "What is the capital of Austria?",
    options: ["Vienna", "Prague", "Zurich", "Bratislava"],
    answer: "Vienna",
  },
  {
    question: "What is the capital of Czech Republic?",
    options: ["Vienna", "Prague", "Budapest", "Warsaw"],
    answer: "Prague",
  },
  {
    question: "What is the capital of Poland?",
    options: ["Krakow", "Gdansk", "Warsaw", "Wroclaw"],
    answer: "Warsaw",
  },
  {
    question: "What is the capital of Greece?",
    options: ["Sparta", "Thessaloniki", "Athens", "Mykonos"],
    answer: "Athens",
  },
];

// Select html elements
const questionTitle = document.querySelector("#questionTitle");
const optionsSection = document.querySelector("#options");
const resetButton = document.querySelector("#resetButton");
const nextButton = document.querySelector("#nextButton");
const nextAndPrevButtonsSection = document.querySelector("#nextAndPrevButtons");
const scoreDiv = document.querySelector("#scoreDiv");
const scoreText = document.querySelector("#score");
const playAgainButton = document.querySelector("#restart");

// copy the array of questions
let unansweredQuestions = questions.slice();
let currentQuestion;
let score = 0;
let isAllowedToAnswer = false;

optionsSection.addEventListener("mousedown", e=>{
  // if(e.target.)
  if(isAllowedToAnswer){
    if(e.target.tagName === "BUTTON"){
      checkAnswer(e.target)
    }
  }
});

resetButton.addEventListener("click", startNewGame);
playAgainButton.addEventListener("click", startNewGame);

nextButton.addEventListener("click", generateNextQuestion);

startNewGame();

function startNewGame(){
  initializeValues();
  generateNextQuestion();
}

function initializeValues(){
  score = 0;
  unansweredQuestions = questions.slice();
  isAllowedToAnswer = false;

  hideAndShowScoreDiv(false);
}

// generates a random question from the array of questions
function generateNextQuestion() {
  if(!isAllowedToAnswer){
    isAllowedToAnswer = true;
    if(unansweredQuestions.length > 0){
      const randQIndex = Math.floor(Math.random() * unansweredQuestions.length);
      currentQuestion = unansweredQuestions.splice(randQIndex, 1)[0];
      console.log('currentQuestion', currentQuestion, `Unanswered Qs length: ${unansweredQuestions.length}`)
  
      questionTitle.innerText = currentQuestion.question;
  
      generateOptionButtons(currentQuestion);
    } else {
      console.log("gameOVER");
      scoreText.innerText = score;

      hideAndShowScoreDiv(true);
    }
  }
  

}

//if true it shows score div and hides the question and options if false it does the opposite
function hideAndShowScoreDiv(isGameOver){
  if(isGameOver){
    scoreDiv.style.display = "flex";

    questionTitle.classList.add("collapsed");
    optionsSection.classList.add("collapsed");

    nextAndPrevButtonsSection.classList.add("collapsed");
  } else {
    scoreDiv.style.display = "none";

    questionTitle.classList.remove("collapsed");
    optionsSection.classList.remove("collapsed");

    nextAndPrevButtonsSection.classList.remove("collapsed");
  }
}

function generateOptionButtons(question){
  console.log(question.options);

  clearOptionsSection();

  question.options.forEach(option => {
    const newButton = document.createElement("button");

    newButton.innerText = option;
    newButton.setAttribute("value", option);

    optionsSection.appendChild(newButton);
    // document.body.appendChild(newButton)
  })
}

// Deletes option buttons from the options section
function clearOptionsSection(){
  while(optionsSection.childElementCount > 0){
    optionsSection.removeChild(optionsSection.children[0])
  }
}

function checkAnswer(answer){
  isAllowedToAnswer = false;
  if(answer.value === currentQuestion.answer){
    console.log("CORRECT");
    answer.classList.add("correct");
    score+=1;
  } else {
    console.log("FALSE");
    answer.classList.add("wrong");
  }
}

// document.addEventListener("keydown", keyDownEventListener);

// function keyDownEventListener(event){
//   console.log(event);
// }