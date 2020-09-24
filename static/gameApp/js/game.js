var flappyGamePiece;
var myScore;
var myObstacles = [];
var gameDifficulty = 0.2;

function startGame() {
    flappyGameArea.start();
    var width = getSize(window.innerWidth);
    var height = getSize(window.innerHeight);
    //console.log(height);
    flappyGamePiece = new component(90, 90, "black", width*0.3, height/2);
    createObstacles(width, height);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
}

function getObstacle(location, canvasWidth, canvasHeight) {

     var obstacleHeight = gameDifficulty * canvasHeight; //minimum height of the obstacle.  
     obstacleHeight = obstacleHeight + randomNumber(0, gameDifficulty*canvasHeight);
     //console.log(obstacleHeight);

     var obstacleLocationX = canvasWidth; //minimum x value (User eventually sees the obstacles, because its outside the canvas.)


    if(location.localeCompare("top") == 0)
    {
        return new component(100, obstacleHeight, "green", obstacleLocationX , 0);

    }
    else {
        /* A rectangle is formed from the top left of the canvas. 

        (0,0)                (width, 0)
        
        --------------------------------
        
        (0, height)          (width, heigth)

        Suppose canvas heigth = 100, and obstacle height is 30, the bottom rectangle has to touch the end of the canvas
        so the value of y has to be 70. */
        return new component(100, obstacleHeight, "green", obstacleLocationX, canvasHeight - obstacleHeight); 
    }
}

function createObstacles(width, height) {
    var myObstacle  = getObstacle("bottom", width, height);
    var myObstacle1 = getObstacle("top", width, height);

    myObstacles.push(myObstacle, myObstacle1);
}

function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}  

var flappyGameArea = {
    canvas : document.createElement("canvas"), 
    key : false,
    previousKey : false,
    pause: false,
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid black";
        this.canvas.width = getSize(window.innerWidth);
        this.canvas.height = getSize(window.innerHeight);

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('keydown', function(e) {
            flappyGameArea.key = e.keyCode;
            //console.log(e);
        });
        window.addEventListener('keyup', function(e) {
            flappyGameArea.key = false;
            flappyGameArea.previousKey = false;
        });
        window.addEventListener('resize', function(e) {
            //console.log("hey");

            flappyGameArea.canvas.width = getSize(window.innerWidth);
            flappyGameArea.canvas.height = getSize(window.innerHeight);

            flappyGamePiece.x = (getSize(window.innerWidth)/2);
        });
    }, 

    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

//Screen size/resizing  
function getSize(size) {
    size = size - 30;
    var temp = size % 10;
    size = size - temp;

    return size;
}

function hitBottom() {
    var bottom = flappyGameArea.canvas.height - flappyGamePiece.height;
    if (flappyGamePiece.y > bottom) {
        flappyGamePiece.y = bottom;
        return true;
    }
    else {
        return false;
    }
}

function component(width, height, color, x, y) {
    this.gamearea = flappyGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = flappyGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;    
    }
    //component top left = (x,y), top right = (x+width, y). Every pbject is refered to from the top left and on top of the canvas dimensions. 
    this.crashWith = function(otherobj) {
        var myleft = this.x;   
        var myright = this.x + (this.width); 
        var mytop = this.y;
        var mybottom = this.y + (this.height); 
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom <= othertop) || (mytop >= otherbottom) || (myright <= otherleft) || (myleft >= otherright)) {
            crash = false;
        }
        return crash;
    }
}

function hitObstacle(otherobj) {

    var left = flappyGamePiece.x;
    var right = flappyGamePiece.x + (flappyGamePiece.width);
    var top = flappyGamePiece.y;
    var bottom = flappyGamePiece.y + (flappyGamePiece.height);
    var otherleft = otherobj.flappyGamePiece.x;
    var otherright = otherobj.flappyGamePiece
}

function updateObstacles() {

    var width = getSize(window.innerWidth);
    var height = getSize(window.innerHeight);

    var createNewObstacles = false; 

    //for making all the obstacles move left.
    for (var i = 0; i < myObstacles.length; i++) {
        //console.log(myObstacles[i]);
        myObstacles[i].x -= 3;
        myObstacles[i].update();
    }
    //access the last element of myObstacles
    if (myObstacles[myObstacles.length - 1].x < width/2 ) { //less than because the obstacles are moving towards the left. 
        createNewObstacles = true; 
    }

    if(createNewObstacles) {
        //console.log("obstacle creating: " + createNewObstacles);
        createObstacles(width, height);
    }

    //locating if obstacle has left screen. myObstacles(0) is the first element of the array. 
    if (myObstacles[0].x < - myObstacles[0].width) {
        myObstacles = myObstacles.slice(2); 
        /*slice method is removing the first two elements of the array 
        and keeping the last two. Does not increase the size of the array.*/
        //console.log("Removed obstacle array size: " + myObstacles.length);
    }
}

function updateGameArea() {
    if (flappyGameArea.pause) {
        console.log("Game Paused!");
    } else {
        flappyGameArea.clear();
        flappyGamePiece.speedX = 0;
        flappyGamePiece.speedY = 0;

        if (flappyGameArea.key && flappyGameArea.key == 32) {
            if (flappyGameArea.previousKey != flappyGameArea.key) {
                console.log("Jump")
                flappyGamePiece.speedY = -50;
                flappyGameArea.previousKey = flappyGameArea.key;
            }
        }

        //gravity
        flappyGamePiece.speedY += 3;
        updateObstacles();

        if (hitBottom()) {
            restartGame();
        }

        for (i = 0; i < myObstacles.length; i ++) {
            if (flappyGamePiece.crashWith(myObstacles[i])) {
                restartGame();
            } 
        }
        flappyGamePiece.newPos();
        flappyGamePiece.update();
    }
}

function restartGame() {
    flappyGameArea.pause = true ;

    var confirmed = confirm("Restart Game ?");
    console.log(confirmed);
    //Pressed ok (true) restarts game
    if (confirmed) {
        flappyGameArea.clear();
        myObstacles = [];
        var width = getSize(window.innerWidth);
        var height = getSize(window.innerHeight);
        flappyGamePiece = new component(90, 90, "black", 50, height/2);
        createObstacles(width, height);
        flappyGameArea.pause = false ;
        //console.log("me");
    } else { //Cancel (false) changes url location to home
        //console.log("you");
        //console.log(window.location.href);
        window.location.replace('/home');
    }
}



