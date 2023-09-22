class flappyBird extends Phaser.Scene
{
    constructor()
    {
        super({key:'flappyBird'});
        this.init();
    }

    init()
    {
        this.gameOver = false;
        this.downPressed = false;
        this.started = false;
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("00F");
        this.load.image('bg', 'assets/images/bg.jpg');
        this.load.image('grass', 'assets/images/grass.png');
        this.load.spritesheet('birdAnimation', 'assets/images/birdAnim.png', {frameWidth: 17, frameHeight: 12});
    }

    create()
    {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0, 0);
        this.bird = this.physics.add.sprite(config.width/2, config.height/2, 'birdAnimation').setScale(2);
        this.bird.body.setAllowGravity(false);
        this.bird.setCollideWorldBounds(true);
        this.bird.setOffset(0, 3);
        this.cursores = this.input.keyboard.createCursorKeys();  
        
        this.ground = this.physics.add.staticGroup();
        this.ground.create(config.width/2, config.height - 35, 'grass').refreshBody().setScale(20, 1.5);
        this.ground.setVisible(false);
        
        this.pipes = this.physics.add.group();
        
        this.startText = this.add.text(config.width/2, config.height/2, 'Press [ SPACE ] to start', { fontSize: '40px', fill: '#000' });
        this.startText.setPosition(config.width/2 - this.startText.getBounds().width/2, config.height/2 - 150);
        this.startText.depth = 1;
        this.endText = this.add.text(config.width/2, config.height/2, '', { fontSize: '35px', fill: '#990000' });
        this.endText.depth = 1;

        this.loadAnimations();
        this.bird.anims.play('fly');
        this.physics.add.collider(this.bird, this.ground, this.birdHit, null, this);
        
        this.time.addEvent({ delay: gamePrefs.PIPE_SPAWN_RATE, callback: this.addRowOfPipes, callbackScope: this, loop: true });
    }

    update()
    {        
        if (this.gameOver && this.cursores.shift.isDown) this.restart();
        if (this.gameOver) return;
        
        this.bg.tilePositionX += 1;

        if (this.cursores.space.isDown)
        {
            if (!this.downPressed)
            {
                if (!this.started)
                {
                    this.score = -1;
                    this.bird.body.setAllowGravity(true);
                    this.started = true;
                }
                
                this.score += 1;
                this.bird.setVelocityY(-400);
                this.startText.setText('Score: ' + this.score);
                this.startText.setPosition(config.width/2 - this.startText.getBounds().width/2, 50);
            }

            this.downPressed = true;
        }
        else
            this.downPressed = false;
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'fly',
                frames: this.anims.generateFrameNumbers('birdAnimation', { start: 0, end: 2 }),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
    }

    birdHit(bird, ground)
    {
        this.bird.setVelocity(0);

        this.gameOver = true;
        this.startText.setText('Game Over!');
        this.startText.setPosition(config.width/2 - this.startText.getBounds().width/2, config.height/2 - 50);

        this.endText.setText('Press [ SHIFT ] to restart!')
        this.endText.setPosition(config.width/2 - this.endText.getBounds().width/2, config.height/2);

        this.pipes.getChildren().forEach(function(item) {
            item.setVelocity(0, 0);
        }, this);
    }

    addPipe(x, y)
    {
        var pipe = this.pipes.create(x, y, 'grass');
        pipe.setImmovable(true);
        pipe.setVelocity(gamePrefs.PIPE_VELOCITY, 0);
        pipe.body.setAllowGravity(false);
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;

        this.physics.add.collider(this.bird, pipe, this.birdHit, null, this);
    }

    addRowOfPipes()
    {
        if (this.gameOver) return;
        if (!this.started) return;

        var hole = Math.floor(Math.random() * 5) + 1;
        // // Add the 6 pipes 
        // // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++) 
        {
            if (i != hole && i != hole + 1) 
            {
                this.addPipe(config.width, i * 60 + 15);
            }
        }
    }

    restart()
    {
        this.scene.restart();
    }
}