
// Get DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const userInput = document.getElementById('user-input');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const result = document.getElementById('result');
const timer = document.getElementById('timer');



// Add event listeners
startButton.addEventListener('click', startTest);
resetButton.addEventListener('click', resetTest);

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

renderNewQuote()

var charactersTyped = 0
// Set the start time
var timeRemaining = 60;


// Function to start the test
function startTest() {
  // Disable start button
  userInput.disabled = false;
  userInput.placeholder = "Start Typing...";
  startButton.disabled = true;
  // Clear any previous results
  result.textContent = '';

  // Add event listener for user input
  userInput.addEventListener('input', displayTimer);
  userInput.addEventListener('input', checkInput);
 
  // Focus on the input field
  userInput.focus();

  // Function to check the user input
  function checkInput() {
    // Remove the event listener for user input
    userInput.removeEventListener('input', displayTimer);
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

var x;

// Function to start the timer
function displayTimer() {

  x = setInterval(function() {
    
    timeRemaining -= 1;
    timer.textContent = timeRemaining;
    
    // Run when the user clicks Reset button
    if (userInput.disabled === true){
      clearInterval(x)
      timer.textContent = '1';
    }
    
    // Run when the time is up
    if (timeRemaining === 0){
      clearInterval(x)

      timer.textContent = '1';

      // Calculate the typing speed - GWPM = (Total Characters Typed / 5) / Elapsed Time (in minutes)
      const typingSpeed = Math.floor((charactersTyped / 5) / 1);

      // Display the result
      result.textContent = `Your typing speed is ${typingSpeed} WPM.`;

      // Enable start button
      startButton.disabled = false;
    }
  }, 1000)

}

// Function to reset the test
function resetTest() {
  renderNewQuote()
  userInput.disabled = true;
  startButton.disabled = false;
  userInput.value = '';
  result.textContent = '';
  displayTimer()
  userInput.blur();
}
