import './style.css';

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const gameID = 'GOQxFiWpja2X8drCwwb7';
const requestURL = `${baseURL}${gameID}/scores/`;

// add new score
const name = document.querySelector('#name-input');
const score = document.querySelector('#score-input');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const confirmationMsg = document.querySelector('#confirmation-msg');

const addNewScore = async () => {
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
};

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

const getScoresList = async () => {
  await fetch(requestURL)
    .then((response) => response.json())
    .then((json) => {
      scoresList.innerHTML = `${json.result.sort((a, b) => b.score - a.score).map((score, index) => `<li class="score"><span>${index + 1}.</span>${score.user}: ${score.score}</li>`).join('')}`;
    });
};

getScoresList();

// get list of new scores with refresh button
const refreshBtn = document.querySelector('#refresh-btn');
refreshBtn.addEventListener('click', () => {
  getScoresList();
});
