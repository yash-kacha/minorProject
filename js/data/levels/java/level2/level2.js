// Java Level 2
const javaLevel2 = {
    // Collision data for Java Level 2 (using same as original level2 for now)
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

    init: () => {
        // Parse collision data and create collision blocks
        parsedCollisions = javaLevel2.collisionData.parse2D()
        collisionBlocks = parsedCollisions.createObjectsFrom2D()
        player.collisionBlocks = collisionBlocks

        // Set player position (like original level2)
        player.position.x = 830
        player.position.y = 450

        // Set background
        background = new Sprite({
            position: {
                x: 0,
                y: 0,
            },
            imageSrc: './img/map11.png',
            frameRate: 1
        })

        // Create doors for Java Level 2
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
                doorType: 'next' // Next level in Java path
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
                doorType: 'hub' // Back to hub
            })
        ]

        // Door closing animation
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
    }
}
