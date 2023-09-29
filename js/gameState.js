class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
        this.init();
    }

    init()
    {
        this.started = false;
        this.gameOver = false;
        this.canShoot = true;
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("112");
        this.loadFont("retroGaming", "assets/fonts/RetroGaming.ttf");
        this.load.setPath('assets/images');
        this.load.image('bg_back', 'background_back.png');
        this.load.image('bg_front', 'background_frontal.png');
        this.load.spritesheet('ship', 'naveAnim.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('enemy_medium', 'enemy-medium.png', {frameWidth: 32, frameHeight: 16});
        this.load.spritesheet('enemy_big', 'enemy-big.png', {frameWidth: 32, frameHeight: 16});
        this.load.spritesheet('explosion', 'explosion.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('armor', 'spr_armor.png', {frameWidth: 66, frameHeight: 28});
        this.load.spritesheet('powerUp', 'spr_power_up.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('bullet', 'spr_bullet_0.png');
        this.load.image('enemyBullet', 'spr_enemy_bullet_0.png');
        this.load.image('score_bg', 'spr_score_0.png');

        this.load.setPath('assets/sounds');
        this.load.audio('ship_shoot_sound', 'snd_shoot.mp3');
        this.load.audio('ship_hit_sound', 'snd_ship_hit.wav');
        this.load.audio('ship_explode_sound', 'explosion.wav');
        this.load.audio('enemy_shoot_sound', 'snd_enemy_laser.wav');
        this.load.audio('enemy_hit_sound', 'snd_hit.wav');
        this.load.audio('enemy_explode_sound', 'snd_explode.wav');
        this.load.audio('destroy_powerUp', 'snd_powerup.wav');
    }

    create()
    {
        // Sprites
        this.bg_back = this.add.tileSprite(0, 0, config.width, config.height, 'bg_back').setOrigin(0);
        this.bg_front = this.add.tileSprite(0, 0, config.width, config.height, 'bg_front').setOrigin(0);
        this.explosion = this.add.sprite(-100, -100, 'explosion');
        this.explosion.setVisible(false);
        this.ship = this.physics.add.sprite(config.width/2, config.height * 0.95, 'ship').setScale(1);
        this.ship.body.collideWorldBounds = true;

        // Sounds
        this.ship_shoot_sound = this.sound.add('ship_shoot_sound');
        this.ship_hit_sound = this.sound.add('ship_hit_sound');
        this.ship_explode_sound = this.sound.add('ship_explode_sound');

        this.enemy_shoot_sound = this.sound.add('enemy_shoot_sound');
        this.enemy_shoot_sound.volume = 0.5;
        this.enemy_hit_sound = this.sound.add('enemy_hit_sound');
        this.enemy_hit_sound.volume = 0.75;
        this.enemy_explode_sound = this.sound.add('enemy_explode_sound');
        this.enemy_explode_sound.volume = 0.75;

        this.destroy_powerUp = this.sound.add('destroy_powerUp');
        this.destroy_powerUp.volume = 0.75;
        
        this.instructionText = this.add.text(config.width/2, config.height/2, 'Press [ SPACE ] to start\n\n[Kill as many enemies]', { fontSize: '15px', fill: '#FFF', align: 'center', fontFamily: 'retroGaming' }).setOrigin(0.5, 0.5);
        this.instructionText.depth = 1;

        this.score = 0;
        this.score_bg = this.add.sprite(15, 15, 'score_bg').setVisible(false).setOrigin(0, 0.25);
        this.scoreText = this.add.text(47.5, 23, '', { fontStyle: 'bold', fontSize: '14px', fill: '#33302e', fontFamily: 'retroGaming' }).setOrigin(0.5, 0.5);
        this.scoreText.depth = 1;
        this.score_bg.depth = 1;

        this.armor = 5;
        this.armorVisual = this.add.tileSprite(15, 40, 0, 0, 'armor', this.armor - 1).setVisible(false).setOrigin(0);
        this.armorVisual.depth = 1;

        this.loadAnimations();
        this.loadPools();
        this.cursores = this.input.keyboard.createCursorKeys();

        // Only called first press
        this.cursores.space.on(
            'down',
            function()
            {
                this.createBullet();
                this.startGame();
            },
            this
        ); 

        this.cursores.up.on(
            'down',
            function()
            {
                this.restartGame();
            },
            this
        ); 

        this.time.addEvent({ delay: gamePrefs.ENEMY_SPAWN_RATE, callback: this.createEnemy, callbackScope: this, loop: true });
        this.time.addEvent({ delay: gamePrefs.POWERUP_SPAWN_RATE, callback: this.createPowerUp, callbackScope: this, loop: true });
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'ship_idle',
                frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: 'ship_left',
                frames: this.anims.generateFrameNumbers('ship', { start: 2, end: 3}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: 'ship_right',
                frames: this.anims.generateFrameNumbers('ship', { start: 4, end: 5}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: 'enemy_medium',
                frames: this.anims.generateFrameNumbers('enemy_medium', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
        
        this.anims.create(
            {
                key: 'enemy_big',
                frames: this.anims.generateFrameNumbers('enemy_big', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: 'explosion',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4}),
                frameRate: 10,
            }
        )

        this.anims.create(
            {
                key: 'powerUp',
                frames: this.anims.generateFrameNumbers('powerUp', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.enemyBulletPool = this.physics.add.group();
        this.medium_EnemyPool = this.physics.add.group();
        this.big_EnemyPool = this.physics.add.group();
        this.explosionPool = this.add.group();
        this.powerUpPool = this.physics.add.group();

        this.physics.add.overlap(this.bulletPool, this.medium_EnemyPool, this.enemyHit, null, this);
        this.physics.add.overlap(this.bulletPool, this.big_EnemyPool, this.enemyHit, null, this);
        this.physics.add.overlap(this.bulletPool, this.powerUpPool, this.powerUpHit, null, this);
        this.physics.add.overlap(this.enemyBulletPool, this.ship, this.shipHit, null, this);
        this.physics.add.overlap(this.ship, this.medium_EnemyPool, this.shipHit, null, this);
        this.physics.add.overlap(this.ship, this.big_EnemyPool, this.shipHit, null, this);
    }

    startGame()
    {
        if (this.started) return;

        this.started = true;
        this.instructionText.visible = false;
        this.score_bg.visible = true;
        this.armorVisual.visible = true;
    }

    createBullet()
    {
        if (this.gameOver || !this.started) return;
        if (!this.canShoot) return;
        
        var _bullet = this.bulletPool.getFirst(false);

        if (!_bullet)
        {
            console.log('Create bullet');
            _bullet = new bulletPrefab(this, this.ship.x, this.ship.body.top - 10, 'bullet');
            this.bulletPool.add(_bullet);
        }
        else
        {
            console.log('Recycle bullet');
            _bullet.body.reset(this.ship.x, this.ship.body.top - 10);
            _bullet.active = true;
        }

        _bullet.body.setVelocity(0, gamePrefs.BULLET_SPEED);
        this.ship_shoot_sound.play();
        this.canShoot = false;
        this.time.delayedCall(gamePrefs.SHIP_FIRE_RATE, this.resetShot, null, this);
    }

    createEnemyBullet(enemy)
    {
        if (this.gameOver || !this.started) return;

        var _bullet = this.enemyBulletPool.getFirst(false);

        if (!_bullet)
        {
            console.log('Create enemy bullet');
            _bullet = new bulletPrefab(this, enemy.x, enemy.body.bottom + 10, 'enemyBullet');
            this.enemyBulletPool.add(_bullet);
        }
        else
        {
            console.log('Recycle enemy bullet');
            _bullet.body.reset(enemy.x, enemy.body.bottom + 10);
            _bullet.active = true;
        }

        _bullet.body.setVelocity(0, gamePrefs.ENEMY_BULLET_SPEED);
        this.enemy_shoot_sound.play();
    }

    createEnemy()
    {
        if (!this.started || this.gameOver) return;

        // 0 = medium, 1 = big
        var randomEnemyType = Phaser.Math.Between(0, 1);
        var _enemy = randomEnemyType == 0 ? this.medium_EnemyPool.getFirst(false) : this.big_EnemyPool.getFirst(false);
        var randomX = Phaser.Math.FloatBetween(16, config.width - 16);

        if (!_enemy)
        {
            console.log('Create enemy');
            _enemy = new enemyPrefab(this, randomX, -100, randomEnemyType == 0 ? 'enemy_medium' : 'enemy_big');
            randomEnemyType == 0 ? this.medium_EnemyPool.add(_enemy) : this.big_EnemyPool.add(_enemy);
        }
        else
        {
            console.log('Recycle enemy');
            _enemy.health = gamePrefs.ENEMY_HEALTH;
            _enemy.body.reset(randomX, -100);
            _enemy.active = true;
        }

        _enemy.body.setVelocity(0, gamePrefs.ENEMY_SPEED);
        _enemy.fireEvent = this.time.addEvent({ delay: gamePrefs.ENEMY_SHOOT_RATE, callback: this.createEnemyBullet, callbackScope: this, loop: true, args: [_enemy] });
    }

    createExplosion(posX, posY)
    {
        var _explosion = this.explosionPool.getFirst(false);

        if (!_explosion)
        {
            console.log('Create explosion');
            _explosion = this.add.sprite(posX, posY, 'explosion');
            this.explosionPool.add(_explosion);
        }
        else
        {
            console.log('Recycle explosion');
            _explosion.setPosition(posX, posY);
            _explosion.active = true;
            _explosion.setVisible(true);
        }

        _explosion.play('explosion');

        _explosion.on('animationcomplete', () => {
            _explosion.setVisible(false);
            _explosion.active = false;
          })
    }

    createPowerUp()
    {
        if (this.gameOver || !this.started) return;

        var _powerUp = this.powerUpPool.getFirst(false)
        var randomX = Phaser.Math.FloatBetween(16, config.width - 16);

        if (!_powerUp)
        {
            console.log('Create powerUp');
            _powerUp = new powerUpPrefab(this, randomX, 10, 'powerUp');
            this.powerUpPool.add(_powerUp);
        }
        else
        {
            console.log('Recycle powerUp');
            _powerUp.body.reset(randomX, 10);
            _powerUp.active = true;
        }

        var randomXDirection = Phaser.Math.FloatBetween(16, config.width - 16);
        _powerUp.body.setVelocity(randomXDirection, gamePrefs.POWERUP_SPEED);
        _powerUp.anims.play('powerUp');
    }

    shipHit(ship, enemy)
    {
        this.armor -= 1;

        this.createExplosion(enemy.x, enemy.y);
        enemy.active = false;
        enemy.setPosition(-200, -100);
        enemy.body.setVelocity(0);

        this.ship_hit_sound.play();

        if (this.armor <= 0)
        {
            this.gameOver = true;
            this.createExplosion(ship.x, ship.y + 15);
            this.ship_explode_sound.play();

            ship.active = false;
            ship.body.collideWorldBounds = false;
            ship.setPosition(-300, -100);
            ship.body.setVelocity(0);

            this.instructionText.visible = true;
            this.scoreText.visible = false;
            this.score_bg.visible = false;
            this.armorVisual.visible = false;

            var highScore = localStorage.getItem('highScore');
            if (this.score > highScore) localStorage.setItem('highScore', this.score);
            this.instructionText.setText(`Game Over!\nPress [ UP ] to restart\n\nYour score is: ${this.score}\nYour highscore is: ${this.score > highScore ? this.score : highScore}`);

            console.log('Game over');
        }

        console.log('Ship hit');
    }

    enemyHit(bullet, enemy)
    {
        enemy.health -= 1;
        bullet.active = false;
        bullet.setPosition(-100, -100);
        bullet.body.setVelocity(0);

        this.enemy_hit_sound.play();

        if (enemy.health <= 0)
        {
            this.createExplosion(enemy.x, enemy.y + 15);
            this.enemy_explode_sound.play();

            enemy.active = false;
            enemy.setPosition(-200, -100);
            enemy.body.setVelocity(0);
            this.score++;

            enemy.fireEvent.remove();
        }

        console.log('Enemy hit');
    }
    
    powerUpHit(bullet, powerUp)
    {
        powerUp.health -= 1;
        bullet.active = false;
        bullet.setPosition(-100, -100);
        bullet.body.setVelocity(0);

        if (powerUp.health <= 0)
        {
            this.createExplosion(powerUp.x, powerUp.y);
            this.destroy_powerUp.play();
            
            powerUp.active = false;
            powerUp.setPosition(-200, -100);
            powerUp.body.setVelocity(0);

            this.score += gamePrefs.POWERUP_SCORE;
        }
    }

    formatScore(score)
    {
        return String(score).padStart(4, '0');
    }

    restartGame()
    {
        if (!this.started) return;

        this.scene.restart();
    }

    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }

    resetShot()
    {
        this.canShoot = true;
    }

    update()
    {     
        this.bg_back.tilePositionY -= 0.25;
        this.bg_front.tilePositionY -= 1;

        if (this.gameOver || !this.started) return;
        
        if (this.cursores.left.isDown)
        {
            this.ship.body.velocity.x -= gamePrefs.SHIP_SPEED;
            this.ship.anims.play('ship_left', true);
        }
        else if (this.cursores.right.isDown)
        {
            this.ship.body.velocity.x += gamePrefs.SHIP_SPEED;
            this.ship.anims.play('ship_right', true);
        }
        else
        {
            this.ship.anims.play('ship_idle', true);
            //this.ship.body.setVelocity(0);
        }
        
        this.scoreText.setText(this.formatScore(this.score));
        this.armorVisual.setFrame(this.armor - 1);
    }
}