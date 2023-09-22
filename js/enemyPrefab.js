class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _spriteTag)
    {
        //this.nave = this.physics.add.sprite(_posX, _posY, _spriteTag);
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _spriteTag == 'enemy_medium' ? this.anims.play('enemy_medium', true) : this.anims.play('enemy_big', true);
        this.health = gamePrefs.ENEMY_HEALTH;
    }

    preUpdate()
    {
        if (this.y >= config.height)
        {
            this.active = false;
        }
    }
}