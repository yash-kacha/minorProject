// Level 0 - Hub level with doors to Java and Python paths
const level0 = {
    // Collision data for level 0 (based on original level1)
    collisionData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 0, 0, 0, 295, 295, 295, 295, 295, 295, 295, 0, 0, 0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 0,
        0, 295, 295, 0, 0, 295, 0, 0, 0, 0, 0, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0,
        0, 295, 295, 295, 295, 295, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 295, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 295, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 295, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 295, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 295, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 295, 295, 295, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    init: (spawnPosition) => {
        // Parse collision data and create collision blocks
        parsedCollisions = parse2D(level0.collisionData, 32)
        collisionBlocks = createObjectsFrom2D(parsedCollisions)
        player.collisionBlocks = collisionBlocks

        if (spawnPosition) {
            player.position.x = spawnPosition.x
            player.position.y = spawnPosition.y
        }

        // Clear any existing door closing animation
        doorClosing = null;

        // Set background
        background = new Sprite({
            position: {
                x: 0,
                y: 0,
            },
            imageSrc: './img/map1.png',
            frameRate: 1
        })

        // Create doors - one for Java path, one for Python path
        doors = [
            // Java door (left side)
            new Sprite({
                position: {
                    x: 96,
                    y: 169,
                },
                imageSrc: './img/Doors/Opening.png',
                frameRate: 5,
                frameBuffer: 4,
                loop: false,
                autoPlay: false,
                doorType: 'java', // Add identifier for door type
                spawnPosition: { x: 736, y: 480 } // Where player will spawn in java level 1
            }),
            // Python door (right side)
            new Sprite({
                position: {
                    x: 833,
                    y: 456,
                },
                imageSrc: './img/Doors/Opening.png',
                frameRate: 5,
                frameBuffer: 4,
                loop: false,
                autoPlay: false,
                doorType: 'python', // Add identifier for door type
                spawnPosition: { x: 736, y: 480 } // Where player will spawn in python level 1
            })
        ]

        npcs = [
            new NPC({
                position: {
                    x: 350,
                    y: 483,
                },
                imageSrc: './img/pig/IdlePigLeft.png', // Placeholder image
                frameRate: 12,
                frameBuffer: 4,
                dialogue: [
                    "Greetings, traveler!",
                    "This is the hub of knowledge, where coding paths await you.",
                    "The door on the left will guide you into the world of Java.",
                    "The door on the right will open the journey of Python.",
                    "Step forward and choose wisely, for your path will shape your learning!"
                ]
            }),
        
            new NPC({
                position: {
                    x: 250,
                    y: 131,
                },
                imageSrc: './img/pig/IdlePigRight.png', // Placeholder image
                frameRate: 12,
                frameBuffer: 4,
                dialogue: [
                    "Ah, you’ve chosen Java!",
                    "Java is strong, structured, and powers countless real-world applications.",
                    "With discipline and logic, you will master it.",
                    "May your learning journey be filled with clarity and success!"
                ]
            }),
        
            new NPC({
                position: {
                    x: 720,
                    y: 258,
                },
                imageSrc: './img/pig/IdlePigLeft.png', // Placeholder image
                frameRate: 12,
                frameBuffer: 4,
                dialogue: [
                    "Ah, you’ve chosen Python!",
                    "Python is simple, elegant, and the favorite of data wizards and AI masters.",
                    "With curiosity and practice, it will become your greatest tool.",
                    "May your learning journey be smooth and inspiring!"
                ]
            })
        ]
        
    }
}
