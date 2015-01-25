// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var label_score;
var player;
var text;
var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("flappybird", "assets/flappy.png");
    game.load.image("pipe","assets/pipe.png");
    game.load.audio("sound", "assets/point.ogg")

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#6600CC");
    text = game.add.text(140, 165, "Welcome to my game",
        {font: "50px Copperplate", fill: "#0000FF"});
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onUp.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onUp.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onUp.add(moveDown);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onHoldCallback = fly;


    label_score = game.add.text(20, 50, "0");

    pipes = game.add.group();
    generate_pipe();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //set initial coordinates for player
    player = game.add.sprite(80, 200, "flappybird");
    // enable physics for the player sprite
    game.physics.arcade.enable(player);

    player.body.velocity.x = 0;
    player.body.velocity.y = -100;
    player.body.gravity.y = 200;
    player.body.collideWorldBounds = true;
    pipe_interval = 1.75;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);
    player.body.bounce.set(0.5)
}

var upkey = new Phaser.Key(game, Phaser.Keyboard.UP);

function fly() {
    player.body.velocity.y = -50;
};

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    game.physics.arcade.overlap(player, pipes, game_over);

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        console.log("isup")
        player.body.velocity.y -= 50;
    }

}

/* describes a click handler

 */



function spaceHandler() {
    game.sound.play("sound");

   // to make img appear in random spots game.add.sprite(game.world.randomX, game.world.randomY, "playerImg");
}

function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
    text.setText("");
}

function moveLeft() {

    player.x -= 10;
}

function moveRight() {

    player.x += 10;
}

function moveUp() {
    //game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.
    player.body.velocity.y -= 100;
    //player.angle -= 5;
}

function moveDown() {

    player.y += 10;
    player.angle += 5;

}

function playerJump () {
    player.body.velocity.y = -150;
}

function generate_pipe(){

        var gap_start = game.rnd.integerInRange(1, 4);
        var gap_size = game.rnd.integerInRange(2, 5);

        for (var count = 0; count < 8; count = count + 1) {
            if (count <= gap_start || count > gap_start+gap_size) {
                add_pipe_block(700, count*50);
            }

        }
    changeScore();
}
function add_pipe_block(x, y){
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function game_over() {
    //timeCheck = game.time.now;
    //if (game.time.now - timeCheck > 500);
    //{
    //    game.destroy();
    //}

    player.body.velocity.x = -200;
}

// LICESE

// 715620-29102014
// 00002a9xV!X1OWb092EiUpZHWNDE8k
// !ylVejzprYoadboDM"x233Lng8EwOJ
//    3NsMkCxVVwL7MQrO9wXbnw6GjoLOzU
