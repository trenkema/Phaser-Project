class powerUpPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _spriteTag)
    {
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);

        this.health = gamePrefs.POWERUP_HEALTH;
    }

    preUpdate(time, delta)
    {
        if (this.y >= config.height)
        {
            this.active = false;
        }

        if (this.x <= 0 + this.body.width/2)
        {
            if (this.body.velocity.x > 0) return;
            this.body.velocity.x *= -1;
        }
        else if (this.x >= config.width - this.body.width/2)
        {
            if (this.body.velocity.x < 0) return;
            this.body.velocity.x *= -1;
        }

        super.preUpdate(time,delta);
    }

    deActivate()
    {
        if (!this.active) return;

        this.active = false;
        this.setPosition(-200, -100);
        this.body.setVelocity(0);
    }
}