// python Level 1 Integer Sublevel
const pythonLevel1_integer = {
    // Collision data for python Level 1 (using same as original level1 for now)
    collisionData:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 0, 0, 0, 0, 0, 5475, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 5475, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 5475, 5475, 5475, 0, 0, 0, 0, 5475, 5475, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 0, 0, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 0, 0, 5475, 0, 0, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 0, 0, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 5475, 5475, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 5475, 0, 0, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 5475, 5475, 5475, 5475, 0, 0, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 5475, 0, 5475, 5475, 5475, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 0, 5475, 0, 0, 5475, 0, 0, 5475, 0, 0, 0, 0, 0, 0, 0, 0, 5475, 0, 5475, 0, 5475, 0, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 0, 0, 5475, 0, 0, 0, 0, 0, 5475, 0, 0, 5475, 5475, 5475, 0, 0, 5475, 0, 0, 5475, 0, 5475, 0, 0, 5475, 0, 0, 0,
            0, 0, 0, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    init: (spawnPosition) => {
       parsedCollisions = parse2D(pythonLevel1_integer.collisionData, 32)
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
            imageSrc: './img/integer.png',
            frameRate: 1
        })

        doorClosing = new Sprite({
            position: {
               x: 512, y: 354
            },
            imageSrc: './img/Doors/Closing.png',
            frameRate: 5,
            frameBuffer: 4,
            loop: false,
            autoPlay: false,
        })
        // Create doors for python Level 1
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
                doorType: 'hub',
                spawnPosition: { x: 200, y: 100 }
            })
        ]
    }
}