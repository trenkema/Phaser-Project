class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("00F");
        this.load.image('bg', 'assets/images/grass.png');
        this.load.spritesheet('hero', 'assets/images/link.png', {frameWidth: 120, frameHeight: 130});
    }

    create()
    { //Pinta assets en pantalla
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0, 0);
        this.hero = this.add.sprite(config.width/2, config.height/2, 'hero').setScale(1);
        this.cursores = this.input.keyboard.createCursorKeys();
        
        this.loadAnimations();
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'hero_down',
                frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 9 }),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
        this.anims.create(
            {
                key: 'hero_left',
                frames: this.anims.generateFrameNumbers('hero', { start: 11, end: 19 }),
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