// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(750, 300, Phaser.AUTO, 'game', stateActions);

var score = 0;

var label_text;

var player;

var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

    game.load.image("flappy", "assets/flappy.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe","assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#99FF99");

    game.add.text(20, 250, "Welcome to Flapper",
        {font: "20px Arial", fill: "#009933"})

    //game.add.sprite(15, 200, "flappy");

    //game.input.onDown.add(clickHandler);

    //game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeScore);

    label_text = game.add.text(20, 20, "0");
    //player = game.add.sprite(100, 200, "flappy");

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);


    //generate_pipe();
    pipes=game.add.group ();
    pipe_interval = 1.75;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(100, 100, "flappy");
    game.physics.arcade.enable(player);

    //player.body.velocity.x = 50;
    player.body.gravity.y = 700;

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);



}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
game.physics.arcade.overlap(player, pipes, game_over);

}
function clickHandler(event){
    game.add.sprite(event.x, event.y, "flappy");
}
function spaceHandler(){
    game.sound.play("score");
}
function changeScore(){
    score = score + 1;
    label_text.setText(score.toString());
    //alert(score);
}



function moveRight(){player.x = player.x + 10}
function moveLeft(){player.x = player.x - 10}
function moveUp(){player.y = player.y - 10}
function moveDown(){player.y = player.y + 10}

function add_pipe_block (x, y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function generate_pipe(){
    var gap_start = game.rnd.integerInRange (1, 5);
    for (var count = 0; count < 8; count = count+1) {
        if (count != gap_start && count != gap_start + 1 && count != gap_start + 2) {
            add_pipe_block(800, count * 50);
        }
    }
    changeScore();
}

function player_jump(){
    player.body.velocity.y = -200;
    game.sound.play("score");

}
function game_over(){
    location.reload();

}