class zelda extends Phaser.Scene
{
    constructor()
    {
        super({key:'zelda'});
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
                key: 'hero_up',
                frames: this.anims.generateFrameNumbers('hero', { start: 20, end: 29 }),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
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
                frames: this.anims.generateFrameNumbers('hero', { start: 10, end: 19 }),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
        this.anims.create(
            {
                key: 'hero_right',
                frames: this.anims.generateFrameNumbers('hero', { start: 30, end: 39 }),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
    }

    update()
    { //Actualiza whatever         
        //this.bg.tilePositionX += 1;
        
        if (this.cursores.left.isDown)
        {
            this.hero.x -= 1;
            this.hero.anims.play('hero_left', true);
        }
        else if (this.cursores.right.isDown)
        {
            this.hero.x += 1;
            this.hero.anims.play('hero_right', true);
        }
        else if (this.cursores.up.isDown)
        {
            this.hero.y -= 1;
            this.hero.anims.play('hero_up', true);
        }
        else if (this.cursores.down.isDown)
        {
            this.hero.y += 1;
            this.hero.anims.play('hero_down', true);
        }
        else
        {
            this.hero.anims.play('hero_down');
        }
    }
}