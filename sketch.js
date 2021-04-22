  var monkey, monkey_running, diedm;
  var banana, bananaImage, obstacle, obstacleImage, jlbg, jlbgimg, ig;
  var score;
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var score = 0;
  var bananas = 0;
  var repeat = 1;

  function preload() 
    {

        jlbgimg = loadImage("jungle.jpg");

        monkey_running = loadAnimation("sprite_0.png", "sprite_1.png",     
                                       "sprite_2.png", "sprite_3.png", 
                                       "sprite_4.png", "sprite_5.png", 
                                       "sprite_6.png", "sprite_7.png", 
                                       "sprite_8.png");

        diedm = loadAnimation("sprite_8.png");
        bananaImage = loadImage("banana.png");
        obstacleImage = loadImage("obstacle.png");

    }



  function setup()
   {
      createCanvas(displayWidth-300 , displayHeight-400);

      //creates the jungle background
      jlbg = createSprite(displayWidth/1.9, 100, displayWidth, displayHeight);
      jlbg.addImage(jlbgimg);
      
      jlbg.scale = 2;

      //creates an invisible ground
      ig = createSprite(displayWidth/2, displayHeight-400, displayWidth, 20);
      ig.visible = false;

      //creates the monkey
      monkey = createSprite(700, 545);
      monkey.addAnimation("running", monkey_running);
      monkey.addAnimation("died", diedm);
      monkey.scale = 0.36;
      //monkey.velocityX = 4;
      monkey.debug = true;
      monkey.setCollider("rectangle", 0, 0, monkey.width, 500);
      console.log(monkey.width);                      
     
      //creates groups
      FRUITS = new Group();
      ROCKS = new Group();
      
      //score
      score = 0;
      bananas = 0;
      repeat = 1;

   }


  function draw() 
    {
        background(220);
        camera.position.x = monkey.x+95;
        camera.position.y = monkey.y-95;

      
      
      
        if (gameState === PLAY)
          {
            jlbg.velocityX = -4;
            //monkey.x = 80;
            
            food();
            obstacles();
            monkey.changeAnimation("running", monkey_running);
            
            if (jlbg.x < 600) 
               {
                 jlbg.x = jlbg.width / 1;
               }

            
            if(keyDown('space') && monkey.y > 255)
               {
                 monkey.velocityY = -16;
               }

            monkey.velocityY = monkey.velocityY + 1.4; 
            
            if (monkey.isTouching(FRUITS))
              {
                FRUITS.destroyEach();
                bananas = bananas + 1;
              }
            
            if (monkey.isTouching(ROCKS))
              {
                gameState = END;
                repeat = 0;
              }
            
            if (repeat === 1)
            {
              score = Math.ceil(frameCount/30);
            }
          }
     
      
        monkey.collide(FRUITS);
        monkey.collide(ROCKS);
        monkey.collide(ig);
        drawSprites();
      
             
      if (gameState === END)
          {
            reset();
            textSize(90)
            fill("black");
            text("You lost , You Suck!",displayWidth-1500,400);
            textSize(30);
            text("Press 'r' to Restart", displayWidth-1200,500);
     
            monkey.changeAnimation("died", diedm);
            
            jlbg.velocityX = 0;
            monkey.velocityY = 0;
            monkey.velocityX = 0;
            
            FRUITS.setLifetimeEach(-1);
            ROCKS.setLifetimeEach(-1);
     
            FRUITS.setVelocityXEach(0);
            ROCKS.setVelocityXEach(0); 
            
            
          }
      
      //displays the score
       fill("white");
       textSize(40);
       //text("Survival Time: "+ score, 640,50);
       text("Banana: "+ bananas, 240,50);
       
        
   }


 function reset()
  {
    jlbg.velocityX = -5;
    if (jlbg.x < 600) 
               {
                 jlbg.x = jlbg.width / 1;
               }
    if (keyDown("r"))
      {
        gameState = PLAY;
        FRUITS.destroyEach();
        ROCKS.destroyEach();
        score = 0;
        bananas = 0;
        repeat = repeat + 1;
        
        
      }

    monkey.changeAnimation("died", diedm);
  
  }


 function food()
  {
   
    if(frameCount % 100 === 0)
      {
        var banana = createSprite(displayWidth,Math.round(random(300,500)));
        // banana.debug = true;
        banana.setCollider("rectangle", 0,0,500, 300);
        banana.velocityX = -5;
        banana.addImage(bananaImage);
        banana.scale=0.23;
        banana.lifetime=1035; 
        FRUITS.add(banana);
      }

  }


  function obstacles()
  {
    if(frameCount % 140 === 0)
      {
        var obstacles = createSprite(displayWidth,displayHeight/2);
         // obstacles.debug = true;
          
        obstacles.setCollider('circle',0,0,170);
        obstacles.velocityX = -5;
        obstacles.addImage(obstacleImage);
        obstacles.scale = 0.4;
        obstacles.lifetime = 1035;
        ROCKS.add(obstacles);


      }



  }