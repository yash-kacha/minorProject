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
                    y: 485,
                },
                imageSrc: './img/IdlePig.png', // Placeholder image
                frameRate: 12,
                frameBuffer: 4,
                dialogue: [
                    'Welcome, traveler!',
                    'This is the hub world.',
                    'The door on the left leads to the Java path.',
                    'The door on the right leads to the Python path.',
                    'Choose your destiny!'
                ]
            })
        ]
    }
}
