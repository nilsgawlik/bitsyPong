console.log("pomng sdfas");

function startGame() {
    let spdX = 0;
    let spdY = 0;
    window.setInterval(function() {
        let cat = sprite[names.sprite.get("cat")];
        let player = sprite[playerId];
        
        if(player.x != 0){
            if(spdX == 0 && spdY ==0) {
                spdX = 1;
                spdY = Math.floor(Math.random(2))*2 - 1;
            }
            player.x = 0;
        }

        function bounce(x, y) {
            window.playSound("sfxBounce");
            spdX = x;
            spdY = y;
        }
        
        cat.x += spdX;
        cat.y += spdY;
        if(cat.x >= 13) {
            // spdX = -1;
            bounce(-1, spdY);
        } 
        if(cat.x <= 1) {
            if(player.y == cat.y)
                bounce(1, spdY);
            if(player.y == cat.y - 1) {
                bounce(1, 1);
            }
            if(player.y == cat.y + 1) {
                bounce(1, -1);
            }
        }
        if(cat.y >= 13) {
            bounce(spdX, -1);
        }
        if(cat.y <= 2) {
            bounce(spdX, 1);
        }

        if(cat.x <= 0) {
            console.log("GAME OVER");
            window.playSound("sfxEnd");
            cat.x = 8;
            cat.y = 8;
            spdX = 0;
            spdY = 0;
        }
    }, 1000/4)
}

startGame();