class CollisionBlock {
    constructor({ position }) {
        this.position = position
        this.width =32
        this.height = 32
    }

    // Draws the collision block on the canvas (for debugging)
    draw() {
        c.fillStyle = 'rgba(255,0,0,0.0)' // Transparent red
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}