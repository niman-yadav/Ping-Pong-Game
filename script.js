//start the motion of the ball
const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name = "Rod1";
const rod2Name = "Rod2";

let score,
    maxScore,
    rod;
    let ww = $(window).width();
    let wh = $(window).height();
    var ballDia = ($('.ball').width());
    var bar_height = $('.bar').height();
    var bar_width = $('.bar').width();
    
    
    var vx = 2;
    var vy = 2;
    var x_ball ;
    var y_ball ;
    

    let rate = 10;
    let l = ww/2;

    let flag = false;
(function () {
   
    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    if (rod === "null" || maxScore === "null") {
        alert("This is the first time you are playing this game. LET'S START");
        maxScore = 0;
        rod = "Rod1"
    } else {
        alert(rod + " has maximum score of " + maxScore * 100);
    }
    $('.ball').css({'top' : bar_height+ballDia/2+'px' , 'position' : 'absolute'});
    y_ball = bar_height+ballDia/2;
    resetBoard(rod);
})();


function resetBoard(rodName) {
    flag= false;
    // Lossing player gets the ball
    if (rodName === rod2Name) {
        $('.ball').css({'top' :wh-bar_height-2*ballDia+'px' , 'position' : 'absolute'});
       y_ball =wh-bar_height-2*ballDia;
        vy = -2;
    } 
    else if (rodName === rod1Name) {
       
        $('.ball').css({'top' : bar_height+ballDia/2+'px' , 'position' : 'absolute'});
        y_ball = bar_height+ballDia/2;
       
        vy =2;
    }
    $('.bar').css({'left' : ww/2 - bar_width/2+'px' , 'position' : 'absolute'}) ;
    l = ww/2 - bar_width/2;
    $('.ball').css({'left' : ww/2 - ballDia/2+'px' , 'position' : 'absolute'});
    x_ball = ww/2 - ballDia/2
    score = 0;
}

function storeWin(rod, score) {

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
    }

    resetBoard(rod);

    alert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));

}
//controls for the bars

$(window).on("keydown" , function(event){
    if(event.keyCode === 13)
    {
       
        if(flag === false)
        {
            flag= true;
            gameOn();
        }
        
    }
    else if(event.keyCode === 39)
    {
        
        if($('.bar').offset().left <= ($(window).width()-bar_width))
        {
            $('.bar').css({"left": (l + rate) +"px"});
            l = l+rate;
        }
    }
    else if(event.keyCode === 37)
    {
       
        if($('.bar').offset().left > 0){
            $('.bar').css({"left": (l - rate) +"px" , "position": "absolute"});
            l = l-rate;
        }

    }
});

//movement of the ball

    function gameOn(){
    var int = setInterval(function(){
    
        $('.ball').css({'left' : (x_ball + vx )+"px" , 'top' : ( y_ball+vy)+"px" , 'position' : 'absolute' });
           // console.log(x_ball+vx , y_ball+vy);
            x_ball += vx;
            y_ball += vy;
        if($('.ball').offset().left <= 0 )
        {
            vx = -vx;
        }
        else if($('.ball').offset().left+ballDia >= ($(window).width()))
        {
            vx = -vx;
        }
        //check for rod2
        else if($('.ball').offset().top+ballDia >= $(window).height()-bar_height )
        {
            vy = -vy;
            score++;
            if(($('.ball').offset().left +ballDia/2 > $('.bar').offset().left +bar_width )||
            ($('.ball').offset().left +ballDia/2 < $('.bar').offset().left) )
            {
                alert("Game-over");
                storeWin( rod1Name ,score);
                clearInterval(int);
            }
           
        }
        //Check for rod1
        else if($('.ball').offset().top <= bar_height )
        {
            vy = -vy;
            score++;
            if(($('.ball').offset().left +ballDia/2 > $('.bar').offset().left +bar_width )||
            ($('.ball').offset().left +ballDia/2 < $('.bar').offset().left) )
            {
                alert("Game-over");
                storeWin( rod2Name ,score);
                
                clearInterval(int);
            
            }
            
        }
        

    }, 10);
    }


