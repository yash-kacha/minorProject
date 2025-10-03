// Event listener for keydown events
window.addEventListener('keydown', (event) => {
    if (player.preventInput) return
    switch (event.key) {
        case 'w':
            // Check if the player is near a door
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]

                if (player.hitbox.position.x + player.hitbox.width <= (door.position.x + door.width) &&
                    (player.hitbox.position.x) >= (door.position.x) &&
                    (player.hitbox.position.y + player.hitbox.height) >= (door.position.y) &&
                    (player.hitbox.position.y) <= (door.position.y + door.height)
                ) {
                    // Prevent entering 'next' door if quest not completed
                    if (door.doorType === 'next' && questState && questState.active && !questState.active.completed) {
                        if (typeof hudMessage !== 'undefined') {
                          hudMessage = 'Complete the quest before proceeding!';
                          hudMessageUntil = Date.now() + 1200;
                        }
                        return
                    }
                    // Enter the door
                    player.velosity.x = 0
                    player.velosity.y = 0
                    player.preventInput = true
                    player.switchSprite('enterDoor')
                    door.play()
                    return
                }
            }
            // Jump if not near a door
            if (player.velosity.y === 0) player.velosity.y = -15
            console.log(`Player position: x:${player.position.x}, y:${player.position.y}`);
            break
        case 'a':
            // Move left
            keys.a.pressed = true
            console.log(`Player position: x:${player.position.x}, y:${player.position.y}`);
            break
        case 'd':
            // Move right
            keys.d.pressed = true
            console.log(`Player position: x:${player.position.x}, y:${player.position.y}`);
            break
        case 's':
            console.log(`Player position: x:${player.position.x}, y:${player.position.y}`);
            break
    }
})

// Event listener for keyup events
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            // Stop moving left
            keys.a.pressed = false
            break
        case 'd':
            // Stop moving right
            keys.d.pressed = false
            break
    }
})