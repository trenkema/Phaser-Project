var gamePrefs =
{
    // Space Shooter
    SHIP_SPEED : 4,
    SHIP_HEALTH : 5,
    SHIP_FIRE_RATE: 200,
    SHIP_INVULNERABLE_TIME: 10000, // ms
    BULLET_SPEED: -125,
    ENEMY_SPEED : 100,
    ENEMY_HEALTH: 2,
    ENEMY_SPAWN_RATE : 700, // ms
    ENEMY_BULLET_SPEED: 300, // ms
    ENEMY_MIN_SHOOT_RATE: 2000, // ms
    ENEMY_MAX_SHOOT_RATE: 6000, // ms
    ENEMY_INVULNERABLE_TIME: 350, // ms
    ENEMY_FLASH_INTERVAL: 75, // ms
    POWERUP_SPEED: 95,
    POWERUP_SPAWN_RATE: 20000, // ms
    POWERUP_SCORE: 25,
    POWERUP_HEALTH: 1,
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