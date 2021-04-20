
// This is the controller object with all the main methods for play
function Controller() {
  
    this.show = true;
    this.gameStarted = false;
    this.aliens;
    this.ship;
    this.fps = 60;
    this.paused = false;
    this.interval;
    this.gameLoop;


    this.getAlienNames = () => {

      $('<div class="alienNames"></div>').insertAfter($('.game-container'));
      $('.alienNames').css('visibility','hidden');
      var url = "/";
      $.get('/aliens.txt', function(data, success){
        if(success){
          var alientext = $('<div class="tempdiv">'+data+'</div>').text();
          alientext = alientext.replace(/\s+/g, " ")
          .replace(" $('#client-login').hide(); ", "")
          .replace("$('.container').css('opacity', 0); $(window).load(function() { $('.container').css('opacity', 1); }); $(document).ready(function() { setTimeout('$(\".container\").css(\"opacity\", 1)', 1000); });", "").trim();
          
          $('.tempdiv').remove();
        }
        else{
          console.log('Failed to retrieve data.');
        }
      });
    }

    this.loadLevel = (level, score) => {
      // Clear the main div
      $('.game-container').empty();
      var welcomeMessage = 'Level '+level+'!';
      var message = new MainMessage(welcomeMessage, 1000);
      message.display();
      setTimeout(function(){
        this.people = new People(60 + 20*level);
        this.aliens = initAliens(level);
        this.ship = initShip(level);
        this.scoreboard = new ScoreBoard(level, score, this);
        this.interval = window.setInterval(this.gameLoop, 1000/this.fps);
      },2000);
    }

    this.toggleGame = () => {
      // Show game
      if(this.show){
        this.show = false;

        $('.game-container').height('100%');
        // $('.game-container').slideDown(500);
        // $('.content-wrapper').slideUp(500);
        $('body').addClass('stop-scrolling');
        // Starting game
        if(!this.gameStarted){
          // Fetch the text from the server
          console.log('About to Get alien names');
          this.getAlienNames();
          this.paused = true;
          var welcomeMessage = 'Welcome to Space Invaders<br/>'+
          'Press space bar to fire<br/>Press left and right arrow keys to move';
          var message = new MainMessage(welcomeMessage, 4000);
          message.display();
          setTimeout(() => {
            this.paused = false;
            this.gameStarted = true;
            this.loadLevel(1, 0);
          },5000);

        }
        // Continuing game
        else if (this.paused) {
          this.paused = false;
          this.interval = window.setInterval(this.gameLoop, 1000/this.fps);
        }
      }
      // Show page
      else{
        this.hideGame();
      }
    };

    this.toggleGame();

    this.hideGame = () => {
      window.clearInterval(this.interval);
      this.paused = true;
      this.show = true;
      $('.game-container').slideUp(500);
      $('.content-wrapper').slideDown(500);
      $('body').removeClass('stop-scrolling');
    }

    this.gameLoop = function(){
      if(this.paused){
        return;
      }
      if(this.ship.firing){
        this.ship.fire();
      }
      this.ship.move();
      this.aliens.move();
      this.people.move();
      // Look for collisions
      // Check for 'game over' condition
      if(this.collisions()){

        var message = new MainMessage('Everyone Died!', 5000);
        message.display();
        setTimeout(function(){
          this.paused = true;
          window.clearInterval(this.interval);
        },6000);

      }
      this.scoreboard.update();

      // Level over
      if(this.aliens.currentNumberOfAliens == 0){
        var level = this.scoreboard.level+1;
        console.log('Level finished'+this.scoreboard.level);
        window.clearInterval(this.interval);
        this.loadLevel(level, this.scoreboard.score);
        // this.paused = true;
        // var message = new MainMessage('Level Complete!', 1000);
        // message.display();
        // setTimeout(function(){
        //   this.paused = false;
        //
        // },2000);

      }

      if(this.scoreboard.health == 0){
        this.scoreboard.level++;
        this.paused = true;


        var message = new MainMessage('You Died!', 5000);
        message.display();
        setTimeout(() => {
          window.clearInterval(this.interval);
        },6000);
      }
    };

    this.bulletLoop = () => {

      for(var i = 0; i<this.ship.bullets.length; i++){
        for(var j = 0; j<this.aliens.bombs.length; j++){
          if((this.ship.bullets[i].right > this.aliens.bombs[j].left) &&
            (this.ship.bullets[i].left < this.aliens.bombs[j].right)&&
            ((this.ship.bullets[i].previousTop > this.aliens.bombs[j].previousBottom) &&
            (this.ship.bullets[i].top < this.aliens.bombs[j].bottom))){

              // Bomb blows up
              for(var k = 0; k< 2+Math.random()*10; k++){
                // Characters between 33 and 126 inclusive
                var name = String.fromCharCode(Math.floor(Math.random()*94 + 33));
                var position = {'top':this.aliens.bombs[j].top, 'left':this.aliens.bombs[j].left - 20 + Math.random()*40};
                var id = this.aliens.shardId;
                this.aliens.shardId++;
                // Variable shade of red
                var color = '#'+Math.floor(100 + Math.random()*155).toString(16)+'0000';
                this.aliens.shrapnelRelocate(name, position, color);
              }
              // Move it off screen
              this.aliens.bombs[j].dispose();
              this.ship.bullets[i].dispose();

              this.scoreboard.score+=10;

            }
        }

        for(var j = 0; j<this.aliens.aliens.length; j++){
          if((this.ship.bullets[i].left > this.aliens.aliens[j].leftOffset + this.aliens.left) &&
            (this.ship.bullets[i].left < this.aliens.aliens[j].leftOffset + this.aliens.left + this.aliens.aliens[j].width)&&
            (this.ship.bullets[i].previousTop > this.aliens.aliens[j].topOffset + this.aliens.top) &&
            (this.ship.bullets[i].top < this.aliens.aliens[j].topOffset + this.aliens.top + this.aliens.aliens[j].height)){
            this.aliens.alienDies(j);
            this.ship.bullets[i].dispose();
            this.scoreboard.score+=30;

          }
        }

      }
    }

    this.bombLoop = () =>{
      // Bombs vs player collisions
      for(var i = 0; i<this.aliens.bombs.length; i++){
        if((this.ship.top < this.aliens.bombs[i].top) &&
          (this.ship.top+this.ship.height > this.aliens.bombs[i].top) &&
          (this.ship.left < this.aliens.bombs[i].left) &&
          (this.ship.left+this.ship.width > this.aliens.bombs[i].left)){

            // Bomb blows up
            for(var j = 0; j< 10+Math.random()*10; j++){
              // Characters between 33 and 126 inclusive
              var name = String.fromCharCode(Math.floor(Math.random()*94 + 33));
              var position = {'top':this.ship.top+Math.random()*50, 'left':this.aliens.bombs[i].left -50 + Math.random()*100};
              var id = this.aliens.shardId;
              this.aliens.shardId++;
              // Variable shade of red
              var color = '#'+Math.floor(100 + Math.random()*155).toString(16)+'0000';
              this.aliens.shrapnelRelocate(name, position, color);
            }
            // Move it off screen
            this.aliens.bombs[i].dispose();
            this.scoreboard.health-=1;

        }
        // Bomb reaches the bottom of the window
        if(this.aliens.bombs[i].top > window.innerHeight-80){

          // Take out the blown up people
          for(var j = 0; j<this.people.people.length; j++){

            if(this.people.people[j].alive &&
              this.aliens.bombs[i].left - 20 < this.people.people[j].left &&
              this.aliens.bombs[i].left + 30 > this.people.people[j].left){
              // i is a person
              var name = 'i';
              var position = {'top':this.people.people[j].top - 80 +Math.random()*50, 'left':this.people.people[j].left -20 + Math.random()*40};
              // white
              var color = '#ffffff';
              this.aliens.shrapnelRelocate(name, position, color);
              this.people.personDies(j);
              // Lose a point for someone dying
              this.scoreboard.score-=1;
            }
          }

          // Bomb blows up
          for(var j = 0; j< 10+Math.random()+10; j++){
            // Characters between 33 and 126 inclusive
            var name = String.fromCharCode(Math.floor(Math.random()*94 + 33));
            var position = {'top':this.aliens.bombs[i].top - 80 +Math.random()*50, 'left':this.aliens.bombs[i].left -50 + Math.random()*100};
            // Variable shade of red
            var color = '#'+Math.floor(Math.random()*255).toString(16)+'0000';
            this.aliens.shrapnelRelocate(name, position, color);
          }
          // Move the bomb so it won't be factored anymore
          this.aliens.bombs[i].dispose();
        }
      }
    }

    this.checkGameOver = () => {
      // If all the people are dead the player loses
      if(this.people.numberOfPeople == 0){
        // Return 'game over'
        return true;
      }

      // Group of aliens reaches the top of the ship
      if(this.aliens.top+this.aliens.height >= this.ship.top){
        for(var i = 0; i<this.aliens.aliens.length; i++){
          if(this.aliens.aliens[i].topOffset + this.aliens.top >= this.ship.top){
            //setTimeout(function(){
              // Bomb blows up
              for(var k = 0; k< 50+Math.random()*50; k++){
                // Characters between 33 and 126 inclusive
                var name = String.fromCharCode(Math.floor(Math.random()*94 + 33));
                // Position under the alien div
                var position = {'top':this.aliens.aliens[i].top, 'left':this.aliens.left + Math.random()*this.aliens.width};
                // Variable shade of red
                var color = '#'+Math.floor(Math.random()*255).toString(16)+'0000';
                this.aliens.shrapnelRelocate(name, position, color);
              }
              for(var j = 0; j<this.people.numberOfPeople; j++){
                // i is a person
                var name = 'i';
                var position = {'top':this.people.people[j].top - 80 +Math.random()*50, 'left':this.people.people[j].left -20 + Math.random()*40};
                // white
                var color = '#ffffff';
                this.aliens.shrapnelRelocate(name, position, color);
                this.people.personDies(j);
                // Lose a point for someone dying
                this.scoreboard.score-=1;
              }
            //}, 5000);
            // Return 'game over'
            return true;

            }
        }
      }
    }

    this.collisions = () => {
      // Bullet vs Aliens collisions
      this.bulletLoop();
      this.bombLoop();
      if(this.checkGameOver()){
        return true;
      }

    }

    //  Listen for keyboard events.
    window.addEventListener("keydown", function keydown(e) {
        var keycode = e.which || window.event.keycode;
        //  Supress further processing of left/right/space (37/39/32)
        if((keycode == 37 || keycode == 39 || keycode == 32) && (this.gameStarted)) {

          if (keycode == 37){
            this.ship.moveleft = true;
          }
          if (keycode == 39){
            this.ship.moveright = true;
          }
          if (keycode == 32){
            this.ship.firing = true;
          }
          e.preventDefault();
        }
        // Prevent scrolling down with down arrow
        if((keycode == 40) && (this.gameStarted)) {

          // Do nothing. Make sure up and down arrows don't work to prevent scrolling
          e.preventDefault();
        }
    });

    //  Listen for keyboard events.
    window.addEventListener("keyup", function keyup(e) {
        var keycode = e.which || window.event.keycode;
        //  Supress further processing of left/right/space (37/39/32)
        if((keycode == 37 || keycode == 39 || keycode == 32) && (this.gameStarted)) {
          if (keycode == 37){
            this.ship.moveleft = false;
          }
          if (keycode == 39){
            this.ship.moveright = false;
          }
          if (keycode == 32){
            this.ship.firing = false;
          }
          e.preventDefault();
        }
    });
}

new Controller();
