var config = 
{
    type: Phaser.AUTO,
    width: 1000,
    height: 550,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1450 },
            debug: false
        }
    },
    scene: [flappyBird], //array con las escenas
    render: { pixelArt: true },
    // Flappy Bird
    PIPE_SPAWN_RATE: 1000,
    PIPE_VELOCITY: -300,
    // Zelda
    HERO_SPEED: 5
};

var juego = new Phaser.Game(config);