import FlappyBird from './components/FlappyBird';

window.onload = function () {
    window.ctx = document.getElementById('birdCanvas').getContext('2d');
    let game = new FlappyBird();
    game.init();
}