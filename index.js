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
    './img/King/Door_Out.png',
    './img/bgBox.png'
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
let npcs = [];
let items = [];
let inventory = [];
let questState = { active: null };
let hudMessage = '';
let hudMessageUntil = 0;

// Level navigation system
const levelNavigation = {
    history: [], // Stack to track level history
    currentLevel: 0,
    
    // Push a level to history
    pushLevel(levelId, spawnPosition = null) {
        this.history.push({
            level: levelId,
            spawnPosition: spawnPosition
        });
        this.currentLevel = levelId;
    },
    
    // Pop the last level from history and return it
    popLevel() {
        if (this.history.length > 1) {
            this.history.pop(); // Remove current level
            const previousLevel = this.history[this.history.length - 1];
            this.currentLevel = previousLevel.level;
            return previousLevel;
        }
        return null; // Stay in current level if no history
    },
    
    // Get the previous level without removing current
    getPreviousLevel() {
        if (this.history.length > 1) {
            return this.history[this.history.length - 2];
        }
        return null;
    },
    
    // Clear history and reset to hub
    resetToHub() {
        this.history = [{ level: 0, spawnPosition: { x: 850, y: 466 } }];
        this.currentLevel = 0;
    },
    
    // Initialize with hub level
    init() {
        this.resetToHub();
    }
};

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
                levelNavigation.pushLevel('java1', door.spawnPosition);
              } else if (door.doorType === 'python') {
                level = 'python1';
                levelNavigation.pushLevel('python1', door.spawnPosition);
              }
            } else if (typeof level === 'string') {
              if (door.doorType === 'next') {
                // Prevent entering next level if an active quest isn't completed
                if (questState.active && !questState.active.completed) {
                  hudMessage = 'Complete the quest before proceeding!';
                  hudMessageUntil = Date.now() + 1500;
                  overlay.opacity = 0; // cancel fade
                  player.preventInput = false;
                  return;
                }
                const path = level.substring(0, level.length - 1); // e.g. 'java'
                const levelNum = parseInt(level.substring(level.length - 1)); // e.g. 1
                const nextLevel = path + (levelNum + 1); // e.g. 'java2'
                level = nextLevel;
                levelNavigation.pushLevel(nextLevel, door.spawnPosition);
              } else if (door.doorType === 'hub') {
                level = 0;
                levelNavigation.resetToHub();
              } else if (level === 'java1' && door.doorType === 'integer') {
                level = 'java1_integer';
                levelNavigation.pushLevel('java1_integer', door.spawnPosition);
              } else if (level === 'python1' && door.doorType === 'integer') {
                level = 'python1_integer';
                levelNavigation.pushLevel('python1_integer', door.spawnPosition);
              } else if (door.doorType === 'index_redirect') {
                // Go back to previous level instead of redirecting to index.html
                const previousLevel = levelNavigation.popLevel();
                if (previousLevel) {
                  level = previousLevel.level;
                  // Use the spawn position from the previous level or door's spawn position
                  door.spawnPosition = previousLevel.spawnPosition || door.spawnPosition;
                } else {
                  // If no previous level, go to hub
                  level = 0;
                  levelNavigation.resetToHub();
                  door.spawnPosition = { x: 850, y: 466 };
                }
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
  'python1_integer': pythonLevel1_integer,
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

  // Item collection: collide hitbox with item rect
  items.forEach((item) => {
    if (item.collected) return;
    const hb = player.hitbox;
    const ib = item.getHitbox();
    if (
      hb.position.x < ib.x + ib.width &&
      hb.position.x + hb.width > ib.x &&
      hb.position.y < ib.y + ib.height &&
      hb.position.y + hb.height > ib.y
    ) {
      item.collected = true;
      inventory.push({ id: item.id, value: item.value, type: item.type });
      hudMessage = `Collected ${item.type}: ${item.value}`;
      hudMessageUntil = Date.now() + 1200;
    }
  });

  // Compute camera to keep player centered
  const viewportWidth = canvas.width / CAMERA_SCALE
  const viewportHeight = canvas.height / CAMERA_SCALE
  const playerCenterX = player.position.x + player.width / 2
  const playerCenterY = player.position.y + player.height / 2
  const cameraX = playerCenterX - viewportWidth / 2
  const cameraY = playerCenterY - viewportHeight / 2


   c.fillStyle = "#3F3851"
  c.fillRect(0, 0, canvas.width, canvas.height)
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
    // If this is a 'next' door and quest is active, lock until completed
    if (door.doorType === 'next' && questState.active && !questState.active.completed) {
      // draw with tinted overlay to indicate locked
      door.update()
      door.draw()
      c.fillStyle = 'rgba(255,0,0,0.3)'
      c.fillRect(door.position.x, door.position.y, door.width || 32, door.height || 64)
    } else {
      door.update()
      door.draw()
    }
  })

  // Items
  items.forEach((item) => {
    item.update();
    item.draw();
  });

  npcs.forEach((npc) => {
    npc.update();
    npc.draw();
  });

  player.collisionBlocks = [...collisionBlocks, ...npcs];

  // Check for NPC interaction
  npcs.forEach((npc) => {
    const distance = Math.hypot(player.position.x - npc.position.x, player.position.y - npc.position.y);
    if (distance < 50) {
      // Display a prompt to interact
      c.fillStyle = 'white';
      c.font = '20px Abaddon';
      c.fillText('Press E to talk', npc.position.x - 50, npc.position.y - 20);
    }
  });

  // Draw door closing animation if it exists
  if (doorClosing) {
    doorClosing.update()
    doorClosing.draw()
  }

  // Draw player last so it sits on top of items/doors
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

  // HUD: inventory and messages
  c.save();
  c.imageSmoothingEnabled = false;
  c.fillStyle = 'white';
  c.font = '16px Abaddon';
  const invText = `Inventory: [${inventory.map((it) => it.value).join(', ')}]`;
  c.fillText(invText, 20, 30);
  if (questState.active) {
    const req = questState.active.required;
    const del = questState.active.delivered || [];
    c.fillText(`Quest (${questState.active.type}): need [${req.join(', ')}], delivered [${del.join(', ')}]`, 20, 50);
  }
  if (Date.now() < hudMessageUntil && hudMessage) {
    c.fillStyle = 'yellow';
    c.fillText(hudMessage, 20, 70);
  }
  c.restore();
}


// Function to get current door type for level transitions


// Initialize game after preloading images
preloadImages().then(() => {
  console.log('All images preloaded successfully');
  levelNavigation.init(); // Initialize navigation system
  levels[level].init({ x: 850, y: 466 })
  animate()
}).catch((error) => {
  console.log('Some images failed to load, but continuing anyway');
  levelNavigation.init(); // Initialize navigation system
  levels[level].init({ x: 850, y: 466 })
  animate()
})

window.addEventListener('keydown', (event) => {
  if (event.key === 'e') {
    for (let i = 0; i < npcs.length; i++) {
      const npc = npcs[i];
      const distance = Math.hypot(player.position.x - npc.position.x, player.position.y - npc.position.y);
      if (distance < 50) {
        npc.speak();
        break; // Interact with only one NPC at a time
      }
    }
  }
  if (event.key === 'f') {
    // Attempt item handoff to nearby NPC
    for (let i = 0; i < npcs.length; i++) {
      const npc = npcs[i];
      const distance = Math.hypot(player.position.x - npc.position.x, player.position.y - npc.position.y);
      if (distance < 60) {
        if (!questState.active) {
          hudMessage = 'No quest active.';
          hudMessageUntil = Date.now() + 1500;
          break;
        }
        const req = questState.active.required;
        const delivered = questState.active.delivered || [];
        // find an inventory item that matches the next required value and type
        const nextNeeded = req.find((v) => !delivered.includes(v));
        if (nextNeeded === undefined) {
          hudMessage = 'Quest already complete!';
          hudMessageUntil = Date.now() + 1500;
          break;
        }
        const idx = inventory.findIndex((it) => it.type === questState.active.type && it.value === nextNeeded);
        if (idx !== -1) {
          const [used] = inventory.splice(idx, 1);
          questState.active.delivered = [...delivered, used.value];
          hudMessage = `Delivered ${used.value}.`;
          hudMessageUntil = Date.now() + 1500;
          // Check completion
          const remaining = req.filter((v) => !questState.active.delivered.includes(v));
          if (remaining.length === 0) {
            questState.active.completed = true;
            hudMessage = 'Quest complete! Door unlocked.';
            hudMessageUntil = Date.now() + 2000;
          }
        } else {
          hudMessage = 'You do not have the required item.';
          hudMessageUntil = Date.now() + 1500;
        }
        break;
      }
    }
  }
});

