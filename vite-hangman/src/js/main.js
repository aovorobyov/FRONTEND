import '../css/style.css'
import { darkModeHandle } from './utils';

darkModeHandle();

const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', () => {
    console.log('start game');
})