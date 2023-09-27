var gamePrefs =
{
    // Space Shooter
    SHIP_SPEED : 4,
    SHIP_HEALTH : 2,
    SHIP_FIRE_RATE: 200,
    BULLET_SPEED: -125,
    ENEMY_SPEED : 100,
    ENEMY_HEALTH: 2,
    ENEMY_SPAWN_RATE : 400, // ms
    ENEMY_BULLET_SPEED: 300, // ms
    ENEMY_SHOOT_RATE: 3000, // ms
    POWERUP_SPEED: 95,
    POWERUP_SPAWN_RATE: 20000, // ms
    POWERUP_SCORE: 25,
    POWERUP_HEALTH: 2,
    // Flappy Bird
    PIPE_SPAWN_RATE: 1000, // ms
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