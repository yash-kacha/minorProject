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
            break
        case 'a':
            // Move left
            keys.a.pressed = true
            break
        case 'd':
            // Move right
            keys.d.pressed = true
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