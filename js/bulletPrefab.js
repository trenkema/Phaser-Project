class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _spriteTag)
    {
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
    }

    preUpdate(time, delta)
    {
        if (this.y <= 0 || this.y >= config.height)
        {
            this.active = false;
        }

        super.preUpdate(time,delta);
    }

    deActivate(posX)
    {
        if (!this.active) return;

        this.active = false;
        this.setPosition(posX, -100);
        this.body.setVelocity(0);
    }
}