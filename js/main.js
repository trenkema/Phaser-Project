var gamePrefs =
{
    // Space Shooter
    SHIP_SPEED : 8,
    SHIP_HEALTH : 2,
    BULLET_SPEED: -100,
    ENEMY_SPEED : 100,
    ENEMY_HEALTH: 2,
    ENEMY_SPAWN_RATE : 500, // ms
    ENEMY_BULLET_SPEED: 300,
    ENEMY_SHOOT_RATE: 3000, // ms
    // Flappy Bird
    PIPE_SPAWN_RATE: 1000,
    PIPE_VELOCITY: -300,
    // Zelda
    HERO_SPEED: 5
}

var config = 
{
    type: Phaser.AUTO,
    width: 256,
    height: 512,
    physics: {
        // Flappy Bird
        // default: 'arcade',
        // arcade: {
        //     gravity: { y: 1450 },
        //     debug: false
        // }

        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [gameState], //array con las escenas
    render: { pixelArt: true },
    scale: 
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
     },
};

var juego = new Phaser.Game(config);