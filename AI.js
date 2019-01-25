/*global  childAt, game, checkForWin*/

var aiTilePlaced = false;

function checkBoard(){ //Probably need to set up with promises 

    
    new Promise(function(fulfill, reject){
    //console.log("one");
        aiTilePlaced = false;
        checkTiles(0);
        fulfill(true);
        
    }).then(function(result){
        return new Promise(function(fulfill, reject){
             //console.log("two");
            if(!aiTilePlaced){
                checkTiles(1);
                fulfill(true);
            }
        });
    }).then(function(result){
        return new Promise(function(fulfill, reject){
             //console.log("three");
            if(!aiTilePlaced){
                defaultPlace();
            }
        });
    
    });
}


/*
    0 1 2
    3 4 5
    6 7 8

*/


// only places tile to win or to block opponent
function checkTiles(playerTile){
    /*================================
                Corners
    ================================*/
    
    

        if (childAt(0).data.player == 2 && childAt(1).data.player == playerTile && childAt(2).data.player == playerTile){ // H Top 1
            place(0);
        }
        else if(childAt(0).data.player == 2 && childAt(3).data.player == playerTile && childAt(6).data.player == playerTile ){ //V Left 1
            place(0);
        }
        else if(childAt(0).data.player == 2 && childAt(4).data.player == playerTile && childAt(8).data.player == playerTile ){ //D LT=>RB 1
            place(0);
        }
    
    
   
        else if (childAt(2).data.player == 2 && childAt(1).data.player == playerTile && childAt(0).data.player == playerTile){ // H Top 2
            place(2);
        }
        else if( childAt(2).data.player == 2 && childAt(5).data.player == playerTile && childAt(8).data.player == playerTile ){ //V Right 1
            place(2);
        }
        else if( childAt(2).data.player == 2 && childAt(4).data.player == playerTile && childAt(6).data.player == playerTile ){ //D LB=>RT 1
            place(2);
        }
    
    

        else if (childAt(6).data.player == 2 && childAt(7).data.player == playerTile && childAt(8).data.player == playerTile){ // H Bottom 1
            place(6);
        }
        else if(childAt(6).data.player == 2 && childAt(3).data.player == playerTile && childAt(0).data.player == playerTile ){ //V Left 2
            place(6);
        }
        else if(childAt(6).data.player == 2 && childAt(4).data.player == playerTile && childAt(2).data.player == playerTile ){ //D LB=>RT 2
            place(6);
        }
    
    
        else if (childAt(8).data.player == 2 && childAt(7).data.player == playerTile && childAt(6).data.player == playerTile){ // H Bottom 2
            place(8);
        }
        else if(childAt(8).data.player == 2 && childAt(2).data.player == playerTile && childAt(5).data.player == playerTile ){ //V Right 2
            place(8);
        }
        else if(childAt(8).data.player == 2 && childAt(4).data.player == playerTile && childAt(0).data.player == playerTile ){ //D LT=>RB 2
            place(8);
        }
    
    
    /*================================
                Edges
    ================================*/
    
        else if(childAt(1).data.player == 2 && childAt(0).data.player == playerTile && childAt(2).data.player == playerTile){ // H Top 3
            place(1);
        }
        else if(childAt(1).data.player == 2 && childAt(4).data.player == playerTile && childAt(7).data.player == playerTile){ // V Mid 1
            place(1);
        }
    
    

        else if(childAt(3).data.player == 2 && childAt(4).data.player == playerTile && childAt(5).data.player == playerTile){ // H Mid 1
            place(3);
        }
        else if(childAt(3).data.player == 2 && childAt(0).data.player == playerTile && childAt(6).data.player == playerTile){ // V Left 3
            place(3);
        }
    
    

        else if(childAt(5).data.player == 2 && childAt(3).data.player == playerTile && childAt(4).data.player == playerTile){ // H Mid 2
            place(5);
        }
        else if(childAt(5).data.player == 2 && childAt(2).data.player == playerTile && childAt(8).data.player == playerTile){ // V Right 3
            place(5);
        }
    
    

        else if(childAt(7).data.player == 2 && childAt(6).data.player == playerTile && childAt(8).data.player == playerTile){ // H Bottom 3
            place(7);
        }
        else if(childAt(7).data.player == 2 && childAt(1).data.player == playerTile && childAt(4).data.player == playerTile){ // V Mid 2
            place(7);
        }
    
    
    /*================================
                Center
    ================================*/
    

        else if(childAt(4).data.player == 2 && childAt(1).data.player == playerTile && childAt(7).data.player == playerTile){ // V Mid 3
            place(4);
        }
        else if(childAt(4).data.player == 2 && childAt(3).data.player == playerTile && childAt(5).data.player == playerTile){ // H Mid 3
            place(4);
        }
        else if(childAt(4).data.player == 2 && childAt(0).data.player == playerTile && childAt(8).data.player == playerTile){ // D 3
            place(4);
        }
        else if(childAt(4).data.player == 2 && childAt(2).data.player == playerTile && childAt(6).data.player == playerTile){ // D 3
            place(4);
        }
        
    
    
}


function defaultPlace(){
    var rnd = game.rnd.integerInRange(0,8);
    if(childAt(rnd).data.player === 2){
        place(rnd);
        console.log(`${rnd} random place`);
    }
    else{
        defaultPlace();
    }
}



function place(tileIndex){
    var tile = childAt(tileIndex);
    console.log(`placed at ${tileIndex}`);
     aiTilePlaced = true;
    tile.frame = 0;
    tile.data.player = 0;
    tile.scale.setTo(0);
    game.add.tween(tile.scale).to({x:1, y:1}, 100, "Quad", true);
    checkForWin();
    
    
}