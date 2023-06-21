
// Get DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const userInput = document.getElementById('user-input');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const result = document.getElementById('result');
const timer = document.getElementById('timer');

// Get radom quote as text to type
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplay.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplay.appendChild(characterSpan)
  })
}

let x,
maxTime = 60,
timeLeft = maxTime,
numQuotes = 1,
charactersTyped = 0

// Function to start the test
function startTest() {
  // Disable start button
  startTimer = true;
  userInput.disabled = false;
  userInput.placeholder = "Start Typing...";
  startButton.disabled = true;
  // Clear any previous results
  result.textContent = '';

  // Add event listener for user input

  userInput.addEventListener('input', checkInput);
 
  // Focus on the input field
  userInput.focus();

  // Function to check the user input
  function checkInput() {
    if (numQuotes === 1) {
      x = setInterval(displayTimer, 1000);
      numQuotes = 2
    }

    var input = userInput.value.trim();

    const arrayQuote = quoteDisplay.querySelectorAll('span')
    const arrayValue = userInput.value.split('')
  
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index]
      if (character == null) {
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct = false
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
      } else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct = false
      }
    })

    if (correct) {
      charactersTyped += input.length;
      userInput.value = ''
      userInput.placeholder = ''
      renderNewQuote()
    }
  }
}


// Function to start the timer
function displayTimer() {
  if(timeLeft > 0) {
    timeLeft--;
    timer.textContent = `Time left: ${timeLeft}s`;
  } 
  else {
    clearInterval(x);
    // Calculate the typing speed - GWPM = (Total Characters Typed / 5) / Elapsed Time (in minutes)
    const typingSpeed = Math.floor((charactersTyped / 5) / 1);

    // Display the result
    result.textContent = `Your typing speed is ${typingSpeed} WPM.`;
    result.textContent ='';
    userInput.disabled = true;
  }
}

// Function to reset the test
function resetTest() {
renderNewQuote()
clearInterval(x)
timeLeft = 60;
timer.textContent = `Time left: ${timeLeft}s`
userInput.disabled = true;
startButton.disabled = false;
userInput.value = '';
result.textContent = '';
userInput.blur();
numQuotes = 1;
charactersTyped = 0;
}

renderNewQuote()
// Add event listeners
startButton.addEventListener('click', startTest);
resetButton.addEventListener('click', resetTest);