class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _spriteTag)
    {
        //this.nave = this.physics.add.sprite(_posX, _posY, _spriteTag);
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
    }

    preUpdate()
    {
        if (this.y <= 0 || this.y >= config.height)
        {
            this.active = false;
        }
    }
}