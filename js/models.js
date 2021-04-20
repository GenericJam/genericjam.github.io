// A shard is a piece of shrapnel
// It exists in a static list called shrapnel under Aliens
// The positions are reallocated so they are never really destroyed, just relocated
function Shard(name, position, id, color){
  this.name = name;
  this.left = position.left - 50 +  Math.random()*100.0;
  this.top = position.top;
  this.id = id;
  this.fallRate = Math.random()*5+5;

  var shardElement = '<span class="shard" id="shard'+this.id+'"><bold>'+this.name+'</bold></span>';
  $('.game-container').append(shardElement);
  $('#shard'+this.id).css({"top":this.top, "left":this.left, "color":color});

  this.move = function(){
    this.top += this.fallRate;
    $('#shard'+this.id).css({"top":this.top});
  }
  this.relocate = function(name, position, color){
    this.left = position.left - 50 +  Math.random()*100.0;
    this.top = position.top;
    $('#shard'+this.id).css({"top":this.top, "left":this.left, "color":color});
    $('#shard'+this.id).text(name);
  }
}

// A bomb is what is dropped by the aliens. It exists in a static list under Aliens
function Bomb(position, id){
  this.active = false;
  this.left = position.left - 10 +  Math.random()*20.0;
  this.top = position.top;
  this.id = id;
  this.fallRate = Math.random()*5+5;
  this.height = 0;


  var bombElement = '<span class="bomb" id="bomb'+this.id+'"><bold>U</bold></span>';
  $('.game-container').append(bombElement);
  $('#bomb'+this.id).css({"top":this.top, "left":this.left});

  this.height = $('#bomb'+this.id).height();
  this.width = $('#bomb'+this.id).width();
  this.bottom = position.top + this.height;
  this.previousBottom = this.bottom;
  this.right = this.left + $('#bomb'+this.id).width();

  this.move = function(){
    if(this.active){
      this.top += this.fallRate;
      this.previousBottom = this.bottom;
      this.bottom += this.fallRate;
      $('#bomb'+this.id).css({"top":this.top});
    }
  }
  // This puts the bomb in the position
  this.relocate = function(position){
    this.active = true;
    this.left = position.left - 10 +  Math.random()*20.0;
    this.top = position.top;
    this.bottom = position.top + this.height;
    this.previousBottom = this.bottom;
    this.right = this.left + $('#bomb'+this.id).width();
    $('#bomb'+this.id).css({"top":this.top, "left":this.left});
  }
  // This puts the bomb out of the way and makes it inactive so it won't be moved
  this.dispose = function(){
    this.relocate({"top":-1000, "left":-1000});
  }
}

// An alien is a word from the web page. It exists in a list in Aliens
function Alien(name, leftOffset, topOffset, height, width, id){
  this.alive = true;
  this.name = name;
  this.leftOffset = leftOffset;
  this.topOffset = topOffset;
  this.height = height;
  this.width = width;
  this.id = id;
  this.die = function(){
    this.alive = false;
    this.leftOffset = -1000;
    this.topOffset = -1000;
    $('#alien'+this.id).css({'top':this.topOffset, 'left':this.leftOffset});
  }

  this.toString = function(){
    'Name:' + this.name +
    'left:' + this.left +
    'top:' + this.top +
    'width:' + this.width +
    'height:' + this.height +
    'alive:' + this.alive
  }
}

// This is the main parent object for the Aliens side of things
function Aliens(aliens, width, height, leftBound, rightBound, alienMoveRate,
  bombRate, rowHeight, spaceBetween){
  this.aliens = aliens;
  this.direction = 'right';
  this.width = width;
  this.height = height;
  this.leftBound = leftBound;
  this.rightBound = rightBound;
  this.top = 0;
  this.left = 0;
  this.rowHeight = rowHeight;
  this.spaceBetween = spaceBetween;
  this.maxAliens = this.aliens.length;
  this.currentNumberOfAliens = this.aliens.length;
  this.alienMoveRate = alienMoveRate;

  this.shardId = 0;
  this.shrapnel = [];
  this.numberOfShards = 100;
  for(var i = 0; i<this.numberOfShards; i++){
    var name = '';
    var position = {'top':-1000, 'left':-1000};
    var color = '#008800';
    this.shrapnel.push(new Shard(name, position, i, color));
  }
  // Init all shrapnel
  this.shrapnelRelocate = function(name, position, color){
    this.shardId = this.shardId % this.numberOfShards
    this.shrapnel[this.shardId].relocate(name, position, color);
    this.shardId++;
  }

  this.bombs = [];
  this.bombRate = bombRate;
  this.numberOfBombs = 20;
  this.bombId = 0;
  // Init all bombs
  for(var i = 0; i<this.numberOfBombs; i++){
    var position = {'top':-1000, 'left':-1000};
    this.bombs.push(new Bomb(position, i));
  }

  this.bombRelocate = function(position){
    this.bombId = this.bombId % this.numberOfBombs;
    this.bombs[this.bombId].relocate(position);
    this.bombId++;
  }

  this.move = function(){
    for(var i = 0; i<this.shrapnel.length; i++){
      this.shrapnel[i].move();
    }
    for(var i = 0; i<this.bombs.length; i++){
      this.bombs[i].move();
    }
    // Add bomb
    // If there are aliens
    if((this.aliens.length) && (Math.random() < (this.aliens.length/this.maxAliens)/this.bombRate)){
      // Get an index of an alien to drop the bomb
      var alienIndex = Math.floor(Math.random()*this.aliens.length);
      var position = $('#alien'+this.aliens[alienIndex].id).position();
      var left = this.left + position.left;
      var top = this.top + position.top;
      position = {'top':top, 'left':left};
      this.bombRelocate(position);
    }
    var leftAdjust = 0;
    var topAdjust = 0

    // Move aliens
    if(this.direction=='right'){
      leftAdjust = this.alienMoveRate;
    }else{
      leftAdjust = 0 - this.alienMoveRate;
    }
    this.left += leftAdjust
    if(this.left + this.width > this.rightBound){
      this.direction = 'left';
      topAdjust = this.rowHeight;
      this.top += this.rowHeight;
      leftAdjust = 0;
    }
    else if(this.left <= 0){
      this.direction = 'right';
      topAdjust = this.rowHeight;
      this.top += this.rowHeight;
      leftAdjust = 0;
    }
    $('#aliens').css({"top":this.top, "left":this.left});
  }

  this.alienDies = function(alienIndex){
    this.currentNumberOfAliens--;
    //var alienId = this.aliens[alienIndex].id;
    var shards = this.aliens[alienIndex].name.split('');
    for(var i = 0; i<shards.length; i++){
      //var position = $('#alien'+alienId).position();
      var left = this.aliens[alienIndex].leftOffset + this.left;
      var top = this.aliens[alienIndex].topOffset + this.top;
      position = {'top':top, 'left':left};
      var color = '#008800';
      this.shrapnelRelocate(shards[i], position, color);
    }
    this.aliens[alienIndex].die();
  }
}

// This initializes the aliens at the start of every level
function initAliens(level){

  // Get the names from the hidden div
  var names = $('.alienNames').text();
  var alienArray = $('.alienNames').text().split(' ');
  var leftBound = 0;
  var width = $('.game-container').width()*0.6;
  var rightBound = leftBound + $('.game-container').width();
  var top = 30;
  var left = leftBound;

  var aliensElement = '<div class="aliens" id="aliens"></div>';
  $('.game-container').append(aliensElement);
  $('#aliens').css({"top":top, "left":left, 'width':width});

  var colPosition = left;
  var rowPosition = top;

  // Put together individual aliens
  var totalAliens = 50 + level * 50;

  var startIndex = alienArray.length - totalAliens;
  if(startIndex<0){
    startIndex = 0;
  }

  // Put in the words toward the end first
  for (var i = startIndex; i < alienArray.length; i++){
    var alienName = alienArray[i].trim();

    if ((alienName == '') || (alienName == '\n') || (alienName == '\t')) {
      alienArray.splice(i,1);
    }
    // Buffer it out if it is really small so it isn't impossible to hit
    else if(alienName.length < 3){
      if(alienName.length < 2){
        alienName = '&nbsp;' + alienName + '&nbsp;';
      }
      else{
        alienName = alienName + '&nbsp;';
      }
    }
    alienArray[i] = alienName;
  }

  if (totalAliens > alienArray.length){
      totalAliens = alienArray.length
  }

  // Overall height of the aliens div
  var height = '';
  var rowHeight = 20;
  var spaceBetween = 20;
  var aliens = [];

  // Put in the words toward the end first
  for (var i = alienArray.length - totalAliens; i < alienArray.length; i++){

    var alienName = alienArray[i].trim();

    if (alienName == ''){
      continue;
    }

    var alienElement = '<div class="alien" id="alien'+i+'">'+alienArray[i]+'</div>';

    $('#aliens').append(alienElement);


    if (colPosition > left + width + $('#alien'+i).width()) {
      colPosition = left;
      rowPosition += rowHeight;
      height += rowHeight;
    }
    $('#alien'+i).css({"top":rowPosition, "left":colPosition});

    var leftOffset = $('#alien'+i).position().left;
    var topOffset = $('#alien'+i).position().top;
    var alienWidth = $('#alien'+i).width();
    var alienHeight = $('#alien'+i).height();

    colPosition += alienWidth + spaceBetween;

    var id = i;
    aliens.push(new Alien(alienName, leftOffset, topOffset, alienHeight, alienWidth, id));
  }
  var alienMoveRate = 2 * level;
  var bombRate = 20 - 2 * level;

  return new Aliens(aliens, width, height, leftBound, rightBound,
    alienMoveRate, bombRate, rowHeight, spaceBetween);
}

// A bullet is shot from the ship at the bombs and aliens.
// It exists in a list under Ship and the positions are just reallocated from a
// static list
function Bullet(top, left, id){
  this.active = false;
  this.top = top;
  // This is for tracking the line between bullet positions on successive loops
  this.previousTop;
  this.left = left;
  this.rate = 20;
  this.id = id;
  var bulletElement = '<span class="bullet" id="bullet'+this.id+'"><bold>n</bold></span>';
  $('.game-container').append(bulletElement);
  $('#bullet'+this.id).css({"top":this.top, "left":this.left});

  this.right = this.left + $('#bullet'+this.id).width();

  this.move = function(){
    if(this.active){
      this.previousTop = this.top;
      this.top -= this.rate;
      $('#bullet'+this.id).css({"top":this.top});
    }
  }

  this.relocate = function(top, left){
    this.active = true;
    this.top = top;
    this.previousTop = this.top;
    this.left = left;
    this.right = left + $('#bullet'+this.id).width();
    $('#bullet'+this.id).css({"top":this.top, "left":this.left});
  }

  this.dispose = function(){
    this.relocate(-1000, -1000);
  }

}

// BulletCasings are spit out the side of the ship when it is firing bullets
// Serves no purpose apart from effect
function BulletCasing(top, left, id){
  this.top = top;
  this.left = left;
  this.yrate = 2;
  this.xrate = 1;
  this.id = id;
  var bulletCasingElement = '<span class="bullet-casing" id="bullet-casing'+this.id+'"><bold>&Pi;</bold></span>';
  $('.game-container').append(bulletCasingElement);
  $('#bullet-casing'+this.id).css({"top":this.top, "left":this.left});

  this.move = function(){
    this.top += this.yrate;
    this.left += this.xrate;
    $('#bullet-casing'+this.id).css({"top":this.top, "left":this.left});
  }

  this.relocate = function(top, left){
    this.top = top;
    this.left = left;
    $('#bullet-casing'+this.id).css({"top":this.top, "left":this.left});
  }
}

// The ship is the main parent object on the players side
function Ship(top, height, left, width, leftBound, rightBound){
  this.firing = false;
  // How often you can fire
  this.firingRate = 200;
  this.nextFire = Date.now()+this.firingRate;
  this.moveleft = false;
  this.moveright = false;
  this.top = top;
  this.height = height;
  this.left = left;
  this.width = width;
  this.leftBound = leftBound;
  this.rightBound = rightBound;
  this.moveRate = 16;

  this.currentBulletId = 0;
  this.numberOfBullets = 100;
  this.bullets = [];
  for(var i = 0; i<this.numberOfBullets; i++){
    this.bullets.push(new Bullet(-1000, -1000, i));
  }

  this.currentBulletCasingId = 0;
  this.numberOfBulletCasings = 15;
  this.bulletCasings = [];
  for(var i = 0; i<this.numberOfBulletCasings; i++){
    this.bulletCasings.push(new BulletCasing(-1000, -1000, i));
  }

  this.move = function(){

    for(i in this.bullets){
      this.bullets[i].move();
    }

    for(i in this.bulletCasings){
      this.bulletCasings[i].move();
    }

    if(this.moveleft && !this.moveright){
      this.left -= this.moveRate;
      if(this.left <= 0){
        this.left = 1;
      }
    }
    else if(this.moveright && !this.moveleft){
      this.left += this.moveRate;

      if(this.left >= this.rightBound){
        this.left = this.rightBound-1;
      }

    }
    else{
      // Do nothing
      return;
    }
    $('.ship').css({"left":this.left});

  }
  this.fire = function(){
    if(this.nextFire < Date.now()){
      // Make sure that the bullet id is cycled
      this.currentBulletId = this.currentBulletId % this.numberOfBullets;
      this.bullets[this.currentBulletId].relocate(this.top, this.left+this.width/2-2);
      this.currentBulletId++;

      // Make sure that the bullet casing id is cycled
      this.currentBulletCasingId = this.currentBulletCasingId % this.numberOfBulletCasings;
      this.bulletCasings[this.currentBulletCasingId].relocate(this.top, this.left+this.width);
      this.currentBulletCasingId++;

      this.nextFire = Date.now()+this.firingRate;
    }
  }
}
// This initializes the ship at the beginning of every level
function initShip(level){
  var shipElement = '<span class="ship ruben" id="ship">v</span>';
  $('.game-container').append(shipElement);
  var top = window.innerHeight-150;
  var height = $('.ship').height();
  var width = $('.ship').width();
  var left = $('.game-container').width()/2 - width/2;
  $('.ship').css({"top":top, "left":left});
  // + 70 for padding in div
  var rightBound = $('.game-container').width() + 70;
  var leftBound = 0;
  return new Ship(top, height, left, width, leftBound, rightBound);;
}
// The score board just displays current stats
function ScoreBoard(level, score, $scope){
    this.health = 3;
    this.score = score;
    this.level = level;

    var scoreElement = '<div class="col-md-2" id="score">Score:<br/>'+this.score+'</div>';
    var healthElement = '<div class="col-md-2" id="health">Health:<br/>'+this.health+'</div>';
    var levelElement = '<div class="col-md-2" id="level">Level:<br/>'+this.level+'</div>';
    var peopleElement = '<div class="col-md-2" id="people">People:<br/>'+$scope.people.currentNumberOfPeople+'</div>';
    var aliensElement = '<div class="col-md-2" id="aliensScore">Aliens:<br/>0</div>';

    var scoreboardElement = '<div class="scoreboard ruben row">'+scoreElement
    +healthElement+levelElement+peopleElement+aliensElement+'</div>';
    $('.game-container').append(scoreboardElement);
    $('.scoreboard').css({'top':0, 'left':$('.game-container').width() - $('.scoreboard').width()});

    this.update = function(){
      $('#score').text('Score:\n'+this.score);
      $('#health').text('Health:\n'+this.health);
      $('#level').text('Level:\n'+this.level);
      $('#people').text('People:\n'+$scope.people.currentNumberOfPeople);
      $('#aliensScore').text('Aliens:\n'+$scope.aliens.currentNumberOfAliens);
    }
}
// The people are the bystanders the ship is trying to keep from dying
// This is a list of persons
function People(numberOfPeople){
  this.people = [];
  this.personId = 0;
  this.currentNumberOfPeople = numberOfPeople;
  this.top = window.innerHeight-80;
  var leftBound = 0;
  var rightBound = $('.game-container').width() + 100;
  for(var i = 0; i<numberOfPeople; i++){
    this.people.push(new Person(this.top, this.personId, leftBound, rightBound));
    this.personId++;
  }

  this.move = function(){
    for(var i = 0; i<this.people.length; i++){
      this.people[i].move();
    }
  }
  this.personDies = function(personId){
    this.currentNumberOfPeople--;
    this.people[personId].die()
  }
}
// A person is a singular of people
function Person(top, id, leftBound, rightBound){
  this.alive = true;
  this.direction = 'right';
  this.width = 0;
  this.height = 0;
  this.leftBound = leftBound;
  this.rightBound = rightBound;
  this.top = top;
  this.left = Math.random()*rightBound;
  this.id = id;
  this.xrate = Math.random()*4;

  var personElement = '<span class="person" id="person'+this.id+'"><bold>i</bold></span>';
  $('.game-container').append(personElement);
  // This will be between 1 and 2.5
  var personMagnifier = 1 + Math.random() * 1.5;
  $('#person'+this.id).css({"top":this.top, "left":this.left, "font-size":personMagnifier+'em'});

  this.move = function(){
    // If this person is dead don't bother
    if(!this.alive){
      return;
    }
    if(this.direction == 'right'){
      this.left += this.xrate;
    }else{
      this.left -= this.xrate;
    }

    if(this.left > this.rightBound){
      this.direction = 'left';
    }else if(this.left < this.leftBound){
      this.direction = 'right';
    }
    $('#person'+this.id).css({"left":this.left});
  }

  this.die = function(){
    this.alive = false;
    this.left = -1000;
    this.top = -1000;
    $('#person'+this.id).css({'top':-1000, 'left':-1000});
  }
}
// This is a banner message that typically pauses the game to show
function MainMessage(message, duration){
  // Take out any previous messages
  $('.message').remove();
  this.duration = duration;
  $('.game-container').append('<h1 class="message ruben">'+message+'</h1>')
  //$('.message').text(message);
  var top = window.innerHeight/2-$('.message').height();
  //var left = $('.game-container').width()/2 - $('.message').width()/2;
  $('.message').css({"top":top, "left":0, "position":"absolute"});

  this.display = function(){
    $('.message').show( 500 ).delay( this.duration ).hide(500);
  }
}
