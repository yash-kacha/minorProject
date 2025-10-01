// Python Level 1
const pythonLevel1 = {
    // Collision data for Python Level 1 (using same as original level1 for now)
    collisionData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 295, 0, 0, 0, 295, 295, 295, 295, 295, 295, 295, 0, 0, 0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 0,
        0, 295, 295, 0, 0, 295, 0, 0, 0, 0, 0, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0,
        0, 295, 295, 295, 295, 295, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 295, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 295, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 295, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 295, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 295, 0, 0, 295, 0, 0, 0,
        0, 0, 0, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 295, 0, 0, 0, 0, 0, 0, 0, 0, 295, 295, 295, 295, 295, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    init: (spawnPosition) => {
        // Parse collision data and create collision blocks
        parsedCollisions = parse2D(pythonLevel1.collisionData, 32)
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

         doorClosing = new Sprite({
            position: {
                x: 833,
                y: 456,
            },
            imageSrc: './img/Doors/Closing.png',
            frameRate: 5,
            frameBuffer: 4,
            loop: false,
            autoPlay: false,
        })

        // Create doors for Python Level 1
        doors = [
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
                doorType: 'next',
                spawnPosition: { x: 100, y: 100 }
            }),
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
                doorType: 'integer',
                spawnPosition: { x: 200, y: 100 }
            })
        ]
    }
}
