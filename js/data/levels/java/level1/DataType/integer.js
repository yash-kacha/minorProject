// Java Level 1 Integer Sublevel
const javaLevel1_integer = {
    // Collision data for Java Level 1 (using same as original level1 for now)
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
       parsedCollisions = parse2D(javaLevel1_integer.collisionData, 32)
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
        // Create doors for Java Level 1
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

        // Items and quest setup for Integer sublevel (Java)
        items = [
            new Item({ id: 'i1', position: { x: 300, y: 450 }, value: 1, type: 'integer' }),
            new Item({ id: 'i2', position: { x: 500, y: 420 }, value: 2, type: 'integer' }),
            new Item({ id: 'i3', position: { x: 700, y: 380 }, value: 3, type: 'integer' }),
        ]
        inventory = []
        questState.active = { type: 'integer', required: [1, 2], delivered: [], completed: false }

        // Add a quest-giver NPC
        npcs = [
            new NPC({
                position: { x: 260, y: 480 },
                imageSrc: './img/pig/IdlePigLeft.png',
                frameRate: 12,
                frameBuffer: 4,
                dialogue: [
                    'Collect the integers I asked for.',
                    'Bring me 1 and 2. Press F to hand over near me.',
                    'The exit will unlock when done.'
                ]
            })
        ]
    }
}