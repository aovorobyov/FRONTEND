import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");
let triesLeft;

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");

  const wordArray = Array.from(word);
  const placeholdersHTML = wordArray.reduce(
    (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter">_</h1>`,
    ""
  );

  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr, i) => {
    return (
      acc +
      `<button class="button-primary keyboard-button" id=${curr}>${curr}</button>`
    );
  }, "");
  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman-img");
  image.id = "hangman-img";

  return image;
};

const checkLetter = (letter) => {
    const word = sessionStorage.getItem( "word" );
    const inputLetter = letter.toLowerCase();

    if (!word.includes(inputLetter)) { // wrong letter
        const triesCounter = document.getElementById('tries-left')
        triesLeft -= 1;
        triesCounter.innerText = triesLeft;

        const hangmanImg = document.getElementById('hangman-img');
        hangmanImg.src = `images/hg-${10-triesLeft}.png`;
    } else { //  correct letter
        const wordArray = Array.from(word);
        wordArray.forEach((currentLetter,  i) => {
            if (currentLetter === inputLetter) {
                document.getElementById(`letter_${i}`).innerText = inputLetter.toUpperCase();
            }
        })
    }
}

export const startGame = () => {
    triesLeft = 10;
  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML +=
    '<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span></p>';

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    
    if (event.target.tagName.toLowerCase() === "button") {
        event.target.disabled = true; // cant click the same button twice
        checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  gameDiv.appendChild(keyboardDiv);
};
