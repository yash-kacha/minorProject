// Level Logic Manager - Handles level progression and door interactions
class LevelLogic {
    constructor() {
        this.currentPath = null; // 'java' or 'python'
        this.currentLevel = 0; // 0 = hub, 1+ = specific levels
        this.levelStructure = {
            java: {
                1: 'java/level1/level1',
                2: 'java/level2/level2'
            },
            python: {
                1: 'python/level1/level1',
                2: 'python/level2/level2'
            }
        };
    }

    // Initialize level based on path and level number
    initLevel(path, levelNumber) {
        this.currentPath = path;
        this.currentLevel = levelNumber;
        
        if (levelNumber === 0) {
            level0.init();
        } else {
            const levelPath = this.levelStructure[path][levelNumber];
            if (levelPath) {
                this.loadLevel(levelPath);
            } else {
                console.error(`Level ${levelNumber} not found for path ${path}`);
            }
        }
    }

    // Load a specific level file dynamically
    loadLevel(levelPath) {
        // This would dynamically load the level file
        // For now, we'll handle this in the main game loop
        console.log(`Loading level: ${levelPath}`);
    }

    // Handle door interaction
    handleDoorInteraction(doorType) {
        if (this.currentLevel === 0) {
            // From hub level, go to level 1 of selected path
            this.initLevel(doorType, 1);
        } else {
            // From specific level, go to next level or back to hub
            this.initLevel(this.currentPath, this.currentLevel + 1);
        }
    }

    // Get current level info
    getCurrentLevelInfo() {
        return {
            path: this.currentPath,
            level: this.currentLevel,
            isHub: this.currentLevel === 0
        };
    }

    // Reset to hub
    resetToHub() {
        this.currentPath = null;
        this.currentLevel = 0;
        level0.init();
    }
}

// Create global instance
const levelLogic = new LevelLogic();
