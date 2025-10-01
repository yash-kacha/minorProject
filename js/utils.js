function parse2D(data, width) {
    const rows = []
    for (let i = 0; i < data.length; i += width) {
        rows.push(data.slice(i, i + width))
    }
    return rows
}

function createObjectsFrom2D(data)
{
    const objects =[]
    data.forEach((row, y) => {

        row.forEach((symbol, x) => {
            if (symbol === 295) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 32,
                            y: y * 32,
                        },
                    })
                )
            }
        })
    })
    return objects
}

function getCollidedDoor() {
  for (let i = 0; i < doors.length; i++) {
    const door = doors[i];
    if (
      player.hitbox.position.x < door.position.x + door.width &&
      player.hitbox.position.x + player.hitbox.width > door.position.x &&
      player.hitbox.position.y < door.position.y + door.height &&
      player.hitbox.position.y + player.hitbox.height > door.position.y
    ) {
      return door;
    }
  }
  return null;
}