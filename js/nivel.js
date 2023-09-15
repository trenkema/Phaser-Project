class nivel extends Phaser.Scene
{
    constructor()
    {
        super({key:'nivel'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("00F");
        this.load.image('bg', 'assets/images/bg.jpg');
        this.load.image('bird', 'assets/images/bird.png');
        this.load.spritesheet('birdAnimation', 'assets/images/birdAnim.png', {frameWidth: 17, frameHeight: 12});
        this.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
    }

    create()
    { //Pinta assets en pantalla
        //this.add.image(config.width/2, config.height/2, 'bg');

        //bird = this.physics.add.staticGroup();

        //bird.create(config.width/2, config.width/2, 'bird').setScale(2).refreshBody();
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0, 0);
        // this.bird = this.add.sprite(config.width/2, config.height/2, 'bird').setScale(2).setOrigin(0);
        this.birdAnimation = this.physics.add.sprite(config.width/2, config.height/2, 'birdAnimation').setScale(5);
        this.birdAnimation.body.setAllowGravity(false);
        this.cursores = this.input.keyboard.createCursorKeys();
        this.startText = this.add.text(config.width/2, config.height/2, 'Press { SPACE } to start', { fontSize: '40px', fill: '#000' });
        
        this.loadAnimations();
        this.birdAnimation.anims.play('fly');
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

    update()
    { //Actualiza whatever         
        this.bg.tilePositionX += 1;
        
        if (this.cursores.space.isDown)
        {
            if (!this.started)
            {
                this.startText.setText('');
                this.birdAnimation.body.setGravityY(1450);
                this.birdAnimation.body.setAllowGravity(true);
                this.started = true;
            }

            this.birdAnimation.setVelocityY(-400);
        }
    }
}