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
           
            // go back to previous level
            new Sprite({
                position: {
                    // x: 832,
                    // y: 296,
                    x: 512, y: 354
                },
                imageSrc: './img/Doors/Opening.png',
                frameRate: 5,
                frameBuffer: 4,
                loop: false,
                autoPlay: false,
                doorType: 'index_redirect',
                spawnPosition: { x: 799, y: 306}
            })
        ]

        // Items and quest setup for Integer sublevel (Python)
        items = [
            new Item({ id: 'pi1', position: { x: 338, y: 402 }, value: 4, type: 'integer' }),
            new Item({ id: 'pi2', position: { x: 300, y: 402 }, value: 5, type: 'integer' }),
            new Item({ id: 'pi3', position: { x: 300, y: 300 }, value: 6, type: 'integer' }),
        ]
        inventory = []
        questState.active = { type: 'integer', required: [4, 6], delivered: [], completed: false }

        // Add a quest-giver NPC
        npcs = [
            new NPC({
                position: { x: 590, y: 400 },
                imageSrc: './img/pig/IdlePigLeft.png',
                frameRate: 12,
                frameBuffer: 4,
                dialogue: [
                    'Collect the integers I asked for.',
                    'Bring me 4 and 6. Press F to hand over near me.',
                    'The exit will unlock when done.'
                ]
            })
        ]
    }
}