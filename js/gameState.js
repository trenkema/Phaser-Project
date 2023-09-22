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
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("112");
        this.load.setPath('assets/images');
        this.load.image('bg_back', 'background_back.png');
        this.load.image('bg_front', 'background_frontal.png');
        this.load.spritesheet('ship', 'naveAnim.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('enemy_medium', 'enemy-medium.png', {frameWidth: 32, frameHeight: 16});
        this.load.spritesheet('enemy_big', 'enemy-big.png', {frameWidth: 32, frameHeight: 16});
        this.load.spritesheet('explosion', 'explosion.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('bullet', 'spr_bullet_0.png');
    }

    create()
    { //Pinta assets en pantalla
        this.bg_back = this.add.tileSprite(0, 0, config.width, config.height, 'bg_back').setOrigin(0);
        this.bg_front = this.add.tileSprite(0, 0, config.width, config.height, 'bg_front').setOrigin(0);
        this.explosion = this.add.sprite(-100, -100, 'explosion');
        this.explosion.setVisible(false);
        this.ship = this.physics.add.sprite(config.width/2, config.height * 0.95, 'ship').setScale(1);
        this.ship.body.collideWorldBounds = true;

        this.instructionText = this.add.text(config.width/2, config.height/2, 'Press [ SPACE ] to start\n\n[Kill as much enemies]', { fontSize: '15px', fill: '#FFF', align: 'center' }).setOrigin(0.5, 0.5);
        this.instructionText.depth = 1;

        this.score = 0;
        this.scoreText = this.add.text(15, 15, '', { fontSize: '15px', fill: '#FFF' });
        this.scoreText.depth = 1;

        this.health = 2;
        this.healthText = this.add.text(15, 30, '', { fontSize: '15px', fill: '#FFF' });
        this.healthText.depth = 1;

        this.loadAnimations();
        this.loadPools();
        this.cursores = this.input.keyboard.createCursorKeys();
        // Only called first press
        this.cursores.space.on(
            'down',
            function()
            {
                this.createBullet();
            },
            this
        ); 

        this.time.addEvent({ delay: gamePrefs.ENEMY_SPAWN_RATE, callback: this.createEnemy, callbackScope: this, loop: true });
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
    }

    loadPools()
    {
        this.bulletPool = this.physics.add.group();
        this.medium_EnemyPool = this.physics.add.group();
        this.big_EnemyPool = this.physics.add.group();
        this.explosionPool = this.add.group();

        this.physics.add.overlap(this.bulletPool, this.medium_EnemyPool, this.enemyHit, null, this);
        this.physics.add.overlap(this.bulletPool, this.big_EnemyPool, this.enemyHit, null, this);
        this.physics.add.overlap(this.ship, this.medium_EnemyPool, this.shipHit, null, this);
        this.physics.add.overlap(this.ship, this.big_EnemyPool, this.shipHit, null, this);
    }

    createBullet()
    {
        if (this.gameOver) return;
        if (!this.started) 
        {
            this.started = true;
            return;
        }

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
            _enemy.body.reset(randomX, -100);
            _enemy.active = true;
        }

        _enemy.body.setVelocity(0, gamePrefs.ENEMY_SPEED);
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

    shipHit(ship, enemy)
    {
        this.health -= 1;

        enemy.active = false;
        enemy.setPosition(-200, -100);
        enemy.body.setVelocity(0);

        if (this.health <= 0)
        {
            this.gameOver = true;
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

        if (enemy.health <= 0)
        {
            this.createExplosion(enemy.x, enemy.y);

            enemy.active = false;
            enemy.setPosition(-200, -100);
            enemy.body.setVelocity(0);
            this.score++;
        }

        console.log('Enemy hit');
    }

    update()
    { //Actualiza whatever         
        this.bg_back.tilePositionY -= 0.25;
        this.bg_front.tilePositionY -= 1;

        // if (this.cursores.up.isDown)
        // {
        //     this.ship.body.velocity.y -= gamePrefs.SHIP_SPEED;
        //     this.ship.anims.play('ship_idle', true);
        // }
        // else if (this.cursores.down.isDown)
        // {
        //     this.ship.body.velocity.y += gamePrefs.SHIP_SPEED;
        //     this.ship.anims.play('ship_idle', true);
        // }
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
            this.ship.body.setVelocity(0);
        }
        
        if (!this.started) return;
        this.scoreText.setText('Score: ' + this.score);
        this.healthText.setText('Health: ' + this.health);
        this.instructionText.visible = false;
    }
}

// Enemy 2 health
// Enemy can shoot
// Enemy collision with ship is death