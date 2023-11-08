class sounds
{
    constructor (scene)
    {
        scene.ship_shoot_sound = scene.sound.add('ship_shoot_sound');
        scene.ship_hit_sound = scene.sound.add('ship_hit_sound');
        scene.ship_explode_sound = scene.sound.add('ship_explode_sound');

        scene.enemy_shoot_sound = scene.sound.add('enemy_shoot_sound');
        scene.enemy_shoot_sound.volume = 0.5;
        scene.enemy_hit_sound = scene.sound.add('enemy_hit_sound');
        scene.enemy_hit_sound.volume = 0.75;
        scene.enemy_explode_sound = scene.sound.add('enemy_explode_sound');
        scene.enemy_explode_sound.volume = 0.75;

        scene.destroy_powerUp = scene.sound.add('destroy_powerUp');
        scene.destroy_powerUp.volume = 0.75;
    }
}