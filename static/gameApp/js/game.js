/* 
2. Box should be in center of screen.
3. Detects when the box falls down (Bird is dead).
*/
var flappyGamePiece;

function startGame() {
    flappyGameArea.start();
    flappyGamePiece = new component(90, 90, "black", 10, 120)
    //flappyGamePiece.style = "top: 50%; left:50%; margin-top: -100px; margin-left: -200px;";  
}

var flappyGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid black";
        this.canvas.width = getSize(window.innerWidth);
        this.canvas.height = getSize(window.innerHeight);

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            flappyGameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function(e) {
            flappyGameArea.key = false;
        });
        window.addEventListener('resize', function(e) {
            console.log("hey");

            flappyGameArea.canvas.width = getSize(window.innerWidth);
            flappyGameArea.canvas.height = getSize(window.innerHeight);

        });
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function getSize(size) {
    size = size - 30;
    var temp = size % 10;
    size = size - temp;

    return size;
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
}

function updateGameArea() {
    flappyGameArea.clear();
    flappyGamePiece.speedX = 0;
    flappyGamePiece.speedY = 0;
    if (flappyGameArea.key && flappyGameArea.key == 13) {
        console.log("HELLOLOLOLOL!!");
        flappyGamePiece.speedY = -2; 
    }
    //gravity
    flappyGamePiece.speedY += 1;
    flappyGamePiece.newPos();    
    flappyGamePiece.update();
}


