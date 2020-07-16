
var flappyGamePiece;

function startGame() {
    flappyGameArea.start();
    width = getSize(window.innerWidth);
    height = getSize(window.innerHeight);
    flappyGamePiece = new component(90, 90, "black", width/2, 50)
}

var flappyGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid black";
        this.canvas.width = getSize(window.innerWidth);
        this.canvas.height = getSize(window.innerHeight);

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 5);
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

            flappyGamePiece.x = (getSize(window.innerWidth)/2);
        });
    }, 

    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    //prompts comfirm box 
    if (hitBottom()) {
        flappyGameArea.clear();
        width = getSize(window.innerWidth);
        flappyGamePiece = new component(90, 90, "black", width/2, 50);
        var confirmed = confirm("Restart Game ?");
        console.log(confirmed);
        //Pressed ok (true) restarts game
        if (confirmed) {
            console.log("me");
        } else { //Cancel (false) changes url location to home
            console.log("you");
            console.log(window.location.href);
            window.location.replace('/home');
            console.log("wtf");
        }
    }
}


