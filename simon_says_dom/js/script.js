const deleteNumsTimeout = 5_000;

let numsArr = [];
let userNumsArr = [];
let resetTimeout;

const numbersList = document.getElementById("numbers-list");
const displayNums = () =>
  numsArr.forEach((n) => (numbersList.innerHTML += `<li>${n}</li>`));

const generateRandomNums = (numCount) => {
  for (let i = 0; i < numCount; i++) {
    const randomNum = Math.floor(Math.random() * 50) + 1;

    numsArr.push(randomNum);
  }
};

const deleteNums = () => (numbersList.innerHTML = "");

const answersForm = document.getElementById("answers-form");
const toggleAnswersForm = (className) => (answersForm.className = className);

const initGame = () => {
  generateRandomNums(5);
  displayNums();

  setTimeout(() => {
    deleteNums();
    toggleAnswersForm("");
  }, deleteNumsTimeout);
};

initGame();

const msg = document.getElementById("message");

const resetGame = () => {
  numsArr = [];
  userNumsArr = [];
  resetTimeout = null;

  answersForm.reset();

  msg.className = "d-none";
  toggleAnswersForm("d-none");

  initGame();
};

function displayMsg(guessedNums) {
  const hasGuessed = !!guessedNums.length;

  msg.className = `d-block text-center fw-semibold ${
    hasGuessed ? "text-success" : "text-danger"
  }`;

  msg.innerText = hasGuessed
    ? `Hai indovinato i seguenti numeri: ${guessedNums.join(", ")}`
    : "Non hai indovinato nessun numero";
}

function handleSubmit(e) {
  e.preventDefault();
  userNumsArr = [];

  const answersFormInputs = answersForm.querySelectorAll("input");

  answersFormInputs.forEach((input) => userNumsArr.push(input.valueAsNumber));

  const guessedNums = userNumsArr.filter((num) => numsArr.includes(num));

  displayMsg(guessedNums);

  if (!guessedNums.length && !resetTimeout) {
    resetTimeout = setTimeout(resetGame, 5_000);
  }
}

answersForm.addEventListener("submit", handleSubmit);
