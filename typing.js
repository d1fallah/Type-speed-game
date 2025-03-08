const words = "Typing speed is a skill that improves with practice, sharpening both accuracy and reflexes. The faster you type, the more seamlessly thoughts flow onto the screen, reducing delays in work or gaming. A strong foundation in touch typing can make a significant difference in productivity and confidence. Whether for coding, writing, or casual chatting, mastering the keyboard is a game-changer.".split(' ');
const wordsCount = words.length;

function addClass(el, name) {
    el.className += ' ' + name;
}

function removeClass(el, name) {
    el.className = el.className.replace(name, '');
}

function randomWord() {
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex-1];
}

function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame() {
    document.getElementById('words').innerHTML = ' ';
    for (let i = 0; i < 200; i++) {
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
}

document.getElementById('game').addEventListener('keyup', ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter.innerHTML;
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    if (isLetter){
        if(currentLetter){
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');
            addClass(currentLetter.nextElementSibling, 'current');
        }
    }
    if(isSpace){
        if(expected !== ' '){
           const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect');
            });
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextElementSibling, 'current');
        if (currentLetter){
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextElementSibling.firstChild, 'current');
    }
});
   
newGame();

//25:39