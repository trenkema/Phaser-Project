var config = 
{
    type: Phaser.AUTO,
    width: 1000,
    height: 550,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [nivel], //array con las escenas
    render: { pixelArt: true },
    HERO_SPEED: 5
};

var juego = new Phaser.Game(config);