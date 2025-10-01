# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a 2D educational platformer game built with HTML5 Canvas and JavaScript. The game teaches programming concepts through an interactive experience where players navigate between Java and Python learning paths. The player character can run, jump, interact with NPCs for dialogue, and enter doors to transition between levels.

## Quick Start Commands

### Running the Game
```powershell
# Serve locally using Python (if available)
python -m http.server 8000
# Or using Node.js live-server
npx live-server --port=8000
# Open http://localhost:8000 in browser
```

### Development Commands
```powershell
# No build process required - direct file editing
# Game runs directly in browser by opening index.html

# For development with live reload:
npx live-server --port=8000 --open
```

## Architecture Overview

### Core Game Structure
- **Canvas-based**: Uses HTML5 Canvas with 2D context for rendering
- **Entity Component System**: Base `Sprite` class extended by `Player`, `NPC` classes  
- **Level-based Architecture**: Modular level system with collision data and initialization functions
- **Animation System**: Sprite-sheet based animations with frame buffering and state management

### Key Components

#### Main Game Files
- `index.html`: Entry point, includes all script dependencies in correct order
- `index.js`: Main game loop, camera system, level management, and player setup
- `style.css`: UI styling for chatbox and fonts

#### Core Classes (`js/classes/`)
- `Sprite.js`: Base class for all drawable entities with animation support
- `Player.js`: Extends Sprite, handles movement, physics, collision, and input
- `NPC.js`: Extends Sprite, manages dialogue system with typewriter effect
- `CollisionBlock.js`: Defines invisible collision boundaries
- `eventListener.js`: Global keyboard input handling

#### Level System (`js/data/levels/`)
- Each level is a JavaScript object with `collisionData` array and `init()` function
- Collision data represents 2D grid (0 = passable, 295 = collision block)
- Level structure: `level0.js` (hub), `java/` and `python/` paths with numbered levels
- Special sub-levels like `java/level1/DataType/integer.js`

### Critical Technical Details

#### Level Transitions
- Door collision detection triggers level changes via `doorType` property
- Transition animations use GSAP with screen overlay fading
- Player input disabled during transitions (`player.preventInput = true`)
- Spawn positions defined per door for seamless level entry

#### Animation System
- Preloading of all sprite images prevents disappearing sprites
- State-based animation switching (idle, run, jump, fall, door enter/exit)
- Frame buffer system controls animation speed independently of game framerate

#### Camera and Rendering
- Camera follows player with configurable zoom (`CAMERA_SCALE = 2`)
- Radial gradient lighting effect centered on player
- Layered rendering: background → collision blocks → doors → NPCs → player → effects

## Level Creation Workflow

When adding new levels:

1. **Create level file** in appropriate directory (`js/data/levels/`)
2. **Define collision data** as flat array (width * height values)
3. **Add level to index.html** script tags
4. **Register in levels object** in `index.js`
5. **Update door connections** by setting `doorType` and `spawnPosition`
6. **Test level transitions** and collision boundaries

### Level File Template
```javascript
const newLevel = {
    collisionData: [/* width * height array of 0s and 295s */],
    init: (spawnPosition) => {
        // Parse collision data
        parsedCollisions = parse2D(newLevel.collisionData, WIDTH)
        collisionBlocks = createObjectsFrom2D(parsedCollisions)
        
        // Set player spawn
        if (spawnPosition) {
            player.position.x = spawnPosition.x
            player.position.y = spawnPosition.y
        }
        
        // Create background, doors, NPCs
        background = new Sprite({...})
        doors = [...]
        npcs = [...]
    }
}
```

## NPC Dialogue System

NPCs support multi-line dialogue with typewriter effect:
- Press 'E' near NPC to start dialogue
- Each press advances to next dialogue line
- Dialogue automatically resets after completion
- Styling controlled via CSS chatbox styles

## Input Controls

- **W**: Jump (or enter door when near one)
- **A/D**: Move left/right  
- **E**: Interact with NPCs

## Asset Organization

- `img/King/`: Player sprite animations (idle, run, jump, fall, door transitions)
- `img/Doors/`: Door opening/closing animations
- `img/pig/`: NPC sprite sheets
- `img/`: Level background images (map1.png, mapData.png, etc.)

## Development Notes

- Game uses pixel-perfect rendering (`c.imageSmoothingEnabled = false`)
- Collision blocks are 32x32 pixel tiles
- Player hitbox is smaller than sprite for precise collision (25x30 vs 32x32)
- Level collision data uses consistent tile size (32px) but level widths can vary
- GSAP library handles smooth transitions and animations
- All images should be preloaded to prevent rendering issues

## Common Debugging

- Enable debug collision visualization by uncommenting collision block drawing
- Player position logged to console during movement for level design
- Check browser developer console for level transition and door collision logs
- Ensure proper script loading order in index.html for dependencies