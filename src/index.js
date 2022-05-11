import './style.css';

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const gameID = 'r6AT9b4hZsYaQUmEfRp0';
const requestURL = `${baseURL}${gameID}/scores/`;

// add new score
const name = document.querySelector('#name-input');
const score = document.querySelector('#score-input');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const confirmationMsg = document.querySelector('#confirmation-msg');

async function addNewScore() {
  await fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify({
      user: name.value,
      score: score.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      confirmationMsg.innerText = json.result;
      confirmationMsg.classList.add('active');
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (name.value && score.value) {
    addNewScore();
    name.value = '';
    score.value = '';
  }
});

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    confirmationMsg.innerText = '';
    confirmationMsg.classList.remove('active');
  });
});

// get list of scores
const scoresList = document.querySelector('#leaderboard-list ul');

async function getScoresList() {
  await fetch(requestURL)
    .then((response) => response.json())
    .then((json) => {
      scoresList.innerHTML = `${json.result.map((score) => `<li class="score">${score.user}: ${score.score}</li>`).join('')}`;
    });
}

getScoresList();

// get list of new scores with refresh button
const refreshBtn = document.querySelector('#refresh-btn');
refreshBtn.addEventListener('click', () => {
  getScoresList();
});
