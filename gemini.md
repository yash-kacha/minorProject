
# Project: 2D Platformer Game

This is a 2D platformer game built with HTML5 Canvas and JavaScript. The game features a player character who can run, jump, and interact with doors to navigate between different levels. The levels are divided into two main paths: Java and Python.

## File Structure

- `index.html`: The main entry point of the game. It sets up the canvas and includes all the necessary JavaScript files.
- `style.css`: Contains the styles for the game, including the font and chatbox.
- `index.js`: The core of the game. It handles the game loop, player animations, level transitions, and input.
- `js/utils.js`: Provides utility functions for parsing level data and checking for door collisions.

### `js/classes/`

- `Sprite.js`: The base class for all game objects. It handles rendering, animation, and preloading of images.
- `Player.js`: Extends the `Sprite` class and adds player-specific logic, such as movement, collision detection, and state management.
- `CollisionBlock.js`: Defines the invisible blocks that the player collides with.
- `NPC.js`: Extends the `Sprite` class to create non-player characters with dialogue.
- `eventListener.js`: Manages all keyboard input for player actions.

### `js/data/levels/`

This directory contains the data for all the levels in the game. Each level is defined as a JavaScript object with the following properties:

- `collisionData`: An array of numbers that represents the collision map of the level.
- `init`: A function that initializes the level. It sets up the collision blocks, background, doors, and NPCs.

The levels are organized into the following subdirectories:

- `level0.js`: The hub world, which contains doors to the Java and Python paths.
- `java/`: Contains the levels for the Java path.
- `python/`: Contains the levels for the Python path.
- `levelLogic.js`: This file seems to be intended to manage the level progression, but the actual level transition logic is handled in `index.js`.

## Game Logic

The game is initialized in `index.js`. It preloads all the necessary images, creates the player and other game objects, and starts the animation loop.

The `animate` function is the heart of the game. It is called on every frame and is responsible for:

- Updating the player's position and animation.
- Drawing the background, collision blocks, doors, and NPCs.
- Checking for collisions between the player and the environment.
- Handling level transitions when the player enters a door.

## How to Add a New Level

To add a new level to the game, you need to:

1.  Create a new JavaScript file in the `js/data/levels/` directory.
2.  In the new file, define a new level object with `collisionData` and an `init` function.
3.  In the `init` function, set up the collision blocks, background, doors, and NPCs for the new level.
4.  In `index.html`, add a new `<script>` tag to include the new level file.
5.  In `index.js`, add the new level to the `levels` object.
6.  Update the `doorType` and `spawnPosition` of the doors in the existing levels to link to the new level.
