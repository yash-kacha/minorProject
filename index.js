const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set canvas to actual window size for true fullscreen
function resizeCanvasToFullscreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvasToFullscreen);
resizeCanvasToFullscreen();

// Camera zoom (3 = 300%, 4 = 400%)
const CAMERA_SCALE = 2;

// Pixel crisp
c.imageSmoothingEnabled = false;

// Preload all animation images to prevent disappearing
function preloadImages() {
  const imageUrls = [
    './img/King/IdleRight.png',
    './img/King/IdleLeft.png', 
    './img/King/RunRight.png',
    './img/King/RunLeft.png',
    './img/King/JumpLeft.png',
    './img/King/JumpRight.png',
    './img/King/Fall.png',
    './img/King/Door_in.png',
    './img/King/Door_Out.png'
  ];
  
  return Promise.all(imageUrls.map(url => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img); // Still resolve to prevent hanging
      img.src = url;
    });
  }));
}

// Game variables
let parsedCollisions;
let collisionBlocks;
let background;
let doors;
let doorClosing;

// Player setup
const player = new Player({
  imageSrc: './img/King/IdleRight.png',
  frameRate: 11,
  animations: {
    enterDoor: {
      frameRate: 8,
      frameBuffer: 3,
      imageSrc: './img/King/Door_in.png',
      loop: false,
      onComplete: () => {
        // Transition to the next level
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            const door = getCollidedDoor();
            console.log('collided door:', door);
            if (!door) return;

            console.log('current level:', level);
            console.log('doorType:', door.doorType);

            // Handle level transition based on current level and door type
            if (level === 0) {
              if (door.doorType === 'java') {
                level = 'java1';
              } else if (door.doorType === 'python') {
                level = 'python1';
              }
            } else if (typeof level === 'string') {
              if (door.doorType === 'next') {
                const path = level.substring(0, level.length - 1); // e.g. 'java'
                const levelNum = parseInt(level.substring(level.length - 1)); // e.g. 1
                level = path + (levelNum + 1); // e.g. 'java2'
              } else if (door.doorType === 'hub') {
                level = 0;
              } else if (level === 'java1' && door.doorType === 'integer') {
                level = 'java1_integer';
              }
            }

            console.log('next level:', level);
            
            levels[level].init(door.spawnPosition);
    
            // Fade out black screen first, then start door exit animation
            gsap.to(overlay, {
              opacity: 0,
              onComplete: () => {
                // Now start the door exit animation after black screen is gone
                setTimeout(() => {
                  player.switchSprite('exitDoor');
                  if (doorClosing) {
                    doorClosing.play(); // Start door closing animation at same time
                  }
                  
                  // Wait for exit animation to complete, then allow input
                  setTimeout(() => {
                    player.preventInput = false;
                  }, 600); // Wait for door exit animation to complete
                }, 100); // Small delay after black screen fades out
              }
            });
          }
        })
      }
    },
    exitDoor: {
      frameRate: 8,
      frameBuffer: 3,
      imageSrc: './img/King/Door_Out.png',
      loop: false
    },
    IdleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      imageSrc: './img/King/IdleLeft.png',
      loop: true,
    },
    IdleRight: {
      frameRate: 11,
      frameBuffer: 2,
      imageSrc: './img/King/IdleRight.png',
      loop: true,
    },
    RunLeft: {
      frameRate: 8,
      frameBuffer: 4,
      imageSrc: './img/King/RunLeft.png',
      loop: true,
    },
    RunRight: {
      frameRate: 8,
      frameBuffer: 4,
      imageSrc: './img/King/RunRight.png',
      loop: true,
    },
    JumpLeft: {
      frameRate: 1,
      frameBuffer: 1,
      imageSrc: './img/King/JumpLeft.png',
      loop: false,
    },
    JumpRight: {
      frameRate: 1,
      frameBuffer: 1,
      imageSrc: './img/King/JumpRight.png',
      loop: false,
    },
    FallLeft: {
      frameRate: 1,
      frameBuffer: 1,
      imageSrc: './img/King/JumpLeft.png',
      loop: false,
    },
    FallRight: {
      frameRate: 1,
      frameBuffer: 1,
      imageSrc: './img/King/JumpRight.png',
      loop: false,
    }
  }
});

// Level setup
let level = 0; // Start with hub level
let levels = {
  0: level0,
  // Java levels
  'java1': javaLevel1,
  'java2': javaLevel2,
  'java1_integer': javaLevel1_integer,
  // Python levels
  'python1': pythonLevel1,
  'python2': pythonLevel2,
};

// Input handling
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

// Screen overlay for transitions
const overlay = {
  opacity: 0,
}

// Animation loop
function animate() {
  window.requestAnimationFrame(animate)

  // Update input/physics first
  player.handleInput(keys)
  player.update()

  // Compute camera to keep player centered
  const viewportWidth = canvas.width / CAMERA_SCALE
  const viewportHeight = canvas.height / CAMERA_SCALE
  const playerCenterX = player.position.x + player.width / 2
  const playerCenterY = player.position.y + player.height / 2
  const cameraX = playerCenterX - viewportWidth / 2
  const cameraY = playerCenterY - viewportHeight / 2

  // Draw world with camera transform and zoom
  c.save()
  c.scale(CAMERA_SCALE, CAMERA_SCALE)
  c.translate(-cameraX, -cameraY)

  // Draw game elements
  background.draw()
  collisionBlocks.forEach(collisionBlock => {
    collisionBlock.draw()
  })

  doors.forEach((door) => {
    door.draw()
  })

  // Draw door closing animation if it exists
  if (doorClosing) {
    doorClosing.draw()
  }

  player.draw()

  // Restore to draw screen-space overlay
  c.restore()

  // Screen-space light/dark gradient (bright center near player, darker outward)
  c.save()
  // Convert world position to screen position
  const screenPlayerX = (playerCenterX - cameraX) * CAMERA_SCALE
  const screenPlayerY = (playerCenterY - cameraY) * CAMERA_SCALE

  const lightRadius = Math.min(canvas.width, canvas.height) * 0.38
  const gradient = c.createRadialGradient(screenPlayerX, screenPlayerY, 0, screenPlayerX, screenPlayerY, lightRadius)
  gradient.addColorStop(0.0, 'rgba(0,0,0,0)')
  gradient.addColorStop(0.6, 'rgba(0,0,0,0.5)')
  gradient.addColorStop(1.0, 'rgba(0,0,0,0.9)')

  c.fillStyle = gradient
  c.fillRect(0, 0, canvas.width, canvas.height)

  // Fade overlay on top if needed (existing overlay)
  c.globalAlpha = overlay.opacity
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()
}


// Function to get current door type for level transitions


// Initialize game after preloading images
preloadImages().then(() => {
  console.log('All images preloaded successfully');
  levels[level].init()
  animate()
}).catch((error) => {
  console.log('Some images failed to load, but continuing anyway');
  levels[level].init()
  animate()
})


