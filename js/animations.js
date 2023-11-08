class animations
{
    constructor (scene)
    {
        scene.anims.create(
            {
                key: 'ship_idle',
                frames: scene.anims.generateFrameNumbers('ship', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        scene.anims.create(
            {
                key: 'ship_left',
                frames: scene.anims.generateFrameNumbers('ship', { start: 2, end: 3}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        scene.anims.create(
            {
                key: 'ship_right',
                frames: scene.anims.generateFrameNumbers('ship', { start: 4, end: 5}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        scene.anims.create(
            {
                key: 'enemy_medium',
                frames: scene.anims.generateFrameNumbers('enemy_medium', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
        
        scene.anims.create(
            {
                key: 'enemy_big',
                frames: scene.anims.generateFrameNumbers('enemy_big', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        scene.anims.create(
            {
                key: 'explosion',
                frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 4}),
                frameRate: 10,
            }
        )

        scene.anims.create(
            {
                key: 'selfTimerPowerUp',
                frames: scene.anims.generateFrameNumbers('selfTimerPowerUp', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )

        scene.anims.create(
            {
                key: 'fullArmorPowerUp',
                frames: scene.anims.generateFrameNumbers('fullArmorPowerUp', { start: 0, end: 1}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            }
        )
    }
}