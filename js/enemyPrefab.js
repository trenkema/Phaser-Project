class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _spriteTag)
    {
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _spriteTag == 'enemy_medium' ? this.anims.play('enemy_medium', true) : this.anims.play('enemy_big', true);
        this.health = gamePrefs.ENEMY_HEALTH;
        this.fireEvent = null;
        this.invulnerableEvent = null;
        this.invulnerable = false;

        this.flashEvent = _scene.time.addEvent({
            delay: gamePrefs.ENEMY_FLASH_INTERVAL, // Delay in milliseconds (adjust as needed)
            loop: true, // Set to true if you want the timer to repeat
            callback: () => { this.visible = !this.visible; }
          });
    }

    preUpdate(time, delta)
    {
        if (this.y >= config.height)
        {
            this.active = false;
            this.fireEvent?.remove();
            this.invulnerableEvent?.remove();
        }

        super.preUpdate(time,delta);
    }

    deActivate()
    {
        if (!this.active) return;

        this.active = false;
        this.setPosition(-200, -100);
        this.body.setVelocity(0);
        this.fireEvent?.remove();
    }
}