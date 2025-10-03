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
            0, 0, 0, 5475, 0, 0, 5475, 0, 0, 0, 0, 0, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 5475, 0, 0, 5475, 0, 5475, 0, 0, 5475, 0, 0, 0,
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
        
        //
    





        
        // Items and quest setup for Integer sublevel (Python)
        items = [
            new Item({ id: 'pi1', position: { x: 845, y: 323 }, value: 4, type: 'integer' }),
            new Item({ id: 'pi2', position: { x: 835, y: 135 }, value: -5, type: 'integer' }),
            new Item({ id: 'pi3', position: { x: 705, y: 150 }, value: 6, type: 'integer' }),
            new Item({ id: 'pi4', position: { x: 591, y: 163 }, value: 7, type: 'integer' }),
            new Item({ id: 'pi5', position: { x: 165, y: 160 }, value: 0, type: 'integer' }),
            new Item({ id: 'pi6', position: { x: 338, y: 415 }, value: -2, type: 'integer' }),
            new Item({ id: 'pi7', position: { x: 300, y: 210 }, value: -9, type: 'integer' }),
            new Item({ id: 'pi8', position: { x:224, y:422 }, value: 5, type: 'integer' }),
            new Item({ id: 'pi9', position: { x:136, y:326 }, value: -1, type: 'integer' }),
            new Item({ id: 'pi10', position: { x:386, y:150}, value: 3, type: 'integer' }),
        ]
        
        inventory = []
        questState.active = { type: 'integer', required: [4, -9,7,0,6,-2], delivered: [], completed: false }

        // Add a quest-giver NPC
        npcs = [
            new NPC({
                position: { x: 590, y: 390 },
                imageSrc: './img/pig/IdlePigLeft.png',
                frameRate: 12,
                frameBuffer: 4,
                dialogue: [
                    "Hello, young coder! Let's learn about integers today.",
                    "Integers are whole numbers: positive, negative, or zero.",
                    "For example: 4, 2, -3, 0, and 7 are integers.",
                    "But numbers like 5.5, 1/3, π, or -4.4 are NOT integers.",
                    "I need you to collect a few integers for me.",
                    "Please bring me 4, -9, 7, 0, -2 and 6. Stand near me and press F to hand them over.",
                    "Once you've given me the numbers, the exit will unlock."
                ]
                
                
            })
        ]
    }
}