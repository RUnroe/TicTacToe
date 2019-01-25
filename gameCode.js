/*global Phaser, checkBoard*/

/*=================================================================
                            Variables
=================================================================*/
var game = new Phaser.Game(970, 700, Phaser.AUTO, "", {preload: preload, create: create, update: update, render: render});

var tileGroup, board, player, playerText, openTiles, xWinCount = 0, oWinCount = 0, drawCount = 0, XScoreText, OScoreText, tieScoreText, restartButton,
    titleText, themeButton;
var keepPlaying = true;
var moveDelay = 500;
var boardVOffset = 160;
var skinIndex = 0;
var skin = [];
//player 1 = X
//player 0 = O;


/*=================================================================
                        Phaser Functions
=================================================================*/


function preload(){
    game.load.spritesheet('tileSS', 'assets/tileSS_3.png', 128, 128);
    game.load.spritesheet('tileSS_christmas', 'assets/tileSS_3_christmas.png', 128, 128);
    game.load.spritesheet('tileSS_portal', 'assets/tileSS_3_portal.png', 128, 128);
    game.load.spritesheet('buttons', 'assets/buttons.png', 160, 64);
    game.load.image('board', 'assets/grid.png');
    
    game.load.bitmapFont('titleFont', 'assets/ticTacToe.png', 'assets/ticTacToe.fnt');
}

function create(){
    game.stage.backgroundColor = 0x121212;
    board = game.add.image((game.width - 384)/2, boardVOffset,'board');
    // board.scale.setTo(2);
    tileGroup = game.add.group();
    tileGroup.inputEnableChildren = true;
    tileGroup.createMultiple(9, 'tileSS', [2], true);
    tileGroup.forEach(tileGroupInit);
    tileGroup.align(3, 3, 128,128);
    tileGroup.x = (game.width - 384)/2;
    tileGroup.y = boardVOffset;
    
    
    skin = ['tileSS', 'tileSS_portal', 'tileSS_christmas'];
    
    //center
    titleText = game.add.bitmapText(game.width/2, 70, 'titleFont' ,"Tic Tac Toe", 96);
    titleText.anchor.setTo(0.5);
    
    
    //Left side of board
    XScoreText = game.add.text((game.width/2)-400, boardVOffset + 50, "You: 0", { font: '32px Arial', fill: '#fff' });
    XScoreText.anchor.setTo(0.5);
    
    OScoreText = game.add.text((game.width/2)-400, boardVOffset + 384/2, "Comp: 0", { font: '32px Arial', fill: '#fff' });
    OScoreText.anchor.setTo(0.5);
    
    tieScoreText = game.add.text((game.width/2)-400, boardVOffset + 334, "Draws: 0", { font: '32px Arial', fill: '#fff' });
    tieScoreText.anchor.setTo(0.5);
    
    
    
    //Right side of board
    playerText = game.add.text((game.width/2)+400, boardVOffset + 50, "X's turn!", { font: '32px Arial', fill: '#fff' });
    playerText.anchor.setTo(0.5);
    
    themeButton = game.add.button((game.width/2)+400, boardVOffset + 384/2, "buttons", changeTheme, this, 4, 3, 5);
    themeButton.scale.setTo(0.9);
    themeButton.anchor.setTo(0.5);
    
    restartButton = game.add.button((game.width/2)+400, boardVOffset + 334, "buttons", restartGame, this, 1, 0, 2);
    restartButton.scale.setTo(0.9);
    restartButton.anchor.setTo(0.5);
    
    
    player = game.rnd.integerInRange(0,1);
    changePlayer();
    

    tileGroup.onChildInputDown.add(changeTile, this);
}

function update(){
    
}

function render(){
    
}




/*=================================================================
                        Custom Functions
=================================================================*/

function changeTile(tile, pointer){
    if(keepPlaying && player == 1){
        if(tile.frame === 2){
            tile.frame = 1;
            tile.data.player = 1;
            tile.scale.setTo(0);
            game.add.tween(tile.scale).to({x:1, y:1}, 100, "Quad", true);
            checkForWin();
        }
    }
    else if(!keepPlaying){
        restartGame();
    }
}

function changeTheme(){
    skinIndex++;
    if(skinIndex > skin.length -1){
        skinIndex = 0;
    }
    var tempTileData = [];
    
   for(let i = 0; i < tileGroup.length; i++){
       tempTileData[i] = childAt(i).data.player;
    }
    
    tileGroup.removeAll();
    tileGroup.inputEnableChildren = true;
    tileGroup.createMultiple(9, skin[skinIndex], [2], true);
    
    for(var i = 0; i < tileGroup.length; i++){
       childAt(i).data.player = tempTileData[i];
       childAt(i).frame = tempTileData[i];
       childAt(i).anchor.setTo(0.5);
    }
    tileGroup.align(3, 3, 128,128);
   
    
}

function tileGroupInit(tile){
    tile.height = 128;
    tile.width = 128;
    tile.data.player = 2;
    tile.frame = 2;
    tile.anchor.setTo(0.5);
}

function changePlayer(){
    player = 1 - player; 
    if(player ==1){
        playerText.text = "Your turn";
    }
    else{
         
         if(keepPlaying){
             playerText.text = "Comp's turn";
             setTimeout(function(){ checkBoard(); }, moveDelay); //delay until complete using promises
         }
    
    }
}

function childAt(index){
    return tileGroup.getChildAt(index);
}

function checkForWin(){
    openTiles = 0;
    tileGroup.forEach(function (tile){
        if(tile.data.player === 2){
            openTiles++;
        }
    });

        console.log(`${openTiles} open tiles`);
        if(childAt(4).data.player == player && childAt(1).data.player == player && childAt(7).data.player == player){ //win
                endGame('win');
        }
            else if(childAt(4).data.player == player && childAt(3).data.player == player && childAt(5).data.player == player){
                endGame('win');
            }
            else if(childAt(4).data.player == player && childAt(0).data.player == player && childAt(8).data.player == player){
                endGame('win');
            }
            else if(childAt(4).data.player == player && childAt(2).data.player == player && childAt(6).data.player == player){
                endGame('win');
            }
        
        else if(childAt(0).data.player == player && childAt(1).data.player == player && childAt(2).data.player == player){ //win
            endGame('win');
        }
            else if(childAt(0).data.player == player && childAt(3).data.player == player && childAt(6).data.player == player){
                endGame('win');
            }
        
        else if(childAt(8).data.player == player && childAt(6).data.player == player && childAt(7).data.player == player){ //win
                endGame('win');
            }
            else if(childAt(8).data.player == player && childAt(2).data.player == player && childAt(5).data.player == player){
                endGame('win');
            }
            
            
        else if(openTiles == 0){ //tie
        keepPlaying = false;
            endGame('tie');
        }
        else{ //no win or tie
            keepPlaying = true;
            changePlayer();
    }
    
}

function endGame(gameState){
    keepPlaying = false;
    if(gameState == 'win'){
        if(player == 1){
            console.log("You won");
            playerText.text ="You won!";
            xWinCount++;
        }
        else{
            console.log("Comp won");
            playerText.text = "You lost";
            oWinCount++;
        }
    }
    else if(gameState == 'tie'){
        playerText.text = "Draw!";
        drawCount++;
    }
    updateScore();
}

function updateScore(){
    XScoreText.text = "You: " +xWinCount;
    OScoreText.text = "Comp: " + oWinCount;
    tieScoreText.text = "Draws: " + drawCount;
}

function restartGame(){
    
    tileGroup.forEach(tileGroupInit);
    keepPlaying = true;
    changePlayer();
}